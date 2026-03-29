# 图片渲染

::: tip
本文将回答以下问题：

- 如何让插件输出好看的图片？
- 有哪些图片渲染方式可供选择？
- 不同渲染方式的优缺点是什么？
:::

## 渲染方式概述

在 Koishi 插件开发中，常见的图片渲染方式有以下几种：

1. **Puppeteer 渲染** - 使用浏览器截图生成图片
2. **SVG 渲染** - 使用 SVG 生成图片
3. **Typst 渲染** - 使用 Typst 排版系统生成图片

下面我们将详细介绍每种渲染方式的实现方法和优缺点。

## Puppeteer 渲染

Puppeteer 是一种基于浏览器的渲染方式，通过生成 HTML 页面并截图来创建图片。

::: tip
在创建 Koishi 实例时，Puppeteer 服务已经内置，无需额外安装 `koishi-plugin-puppeteer`。你只需要在配置文件中启用 Puppeteer 服务即可。

如果你需要使用不带 Canvas 的 Puppeteer 版本（体积更小），可以安装 `koishi-plugin-puppeteer-without-canvas`。
:::

### 依赖安装

::: tabs code
```npm
npm install koishi-plugin-puppeteer-without-canvas
```
```yarn
yarn add koishi-plugin-puppeteer-without-canvas
```
:::

### 基本实现

以下是使用 Puppeteer 渲染图片的基本步骤：

1. 生成包含样式的 HTML 字符串
2. 使用 `ctx.puppeteer.page()` 创建一个新页面
3. 设置页面内容并等待加载完成
4. 截取页面内容生成图片

### 示例代码

```typescript
import { Context } from 'koishi'

export async function renderWithPuppeteer(ctx: Context, html: string) {
  // 创建页面
  const page = await ctx.puppeteer.page()
  
  // 设置页面内容
  await page.setContent(html)
  
  // 等待页面加载完成
  await page.waitForNetworkIdle()
  
  // 截取页面内容
  const buffer = await page.screenshot({
    type: 'png',
    quality: 80,
    fullPage: true
  })
  
  // 关闭页面
  await page.close()
  
  return buffer
}
```

### 优点

- 支持完整的 HTML/CSS 功能
- 可以渲染复杂的页面布局和动画
- 适合需要高度定制化的场景

### 缺点

- 依赖 Chrome 浏览器，体积较大
- 渲染速度相对较慢
- 内存占用较高

### 实际应用

在 `koishi-plugin-onebot-info-image` 插件中，Puppeteer 被用于渲染用户信息卡片，支持多种样式和深色模式。

## SVG 渲染

SVG 渲染是一种轻量级的渲染方式，通过生成 SVG 并转换为图片。

### 依赖安装

::: tabs code
```npm
npm install @resvg/resvg-js
```
```yarn
yarn add @resvg/resvg-js
```
:::

### 基本实现

以下是使用 SVG 渲染图片的基本步骤：

1. 生成 SVG 字符串
2. 使用 `@resvg/resvg-js` 库将 SVG 转换为图片

### 示例代码

```typescript
import { Resvg } from '@resvg/resvg-js'

export function renderWithSvg(svg: string) {
  // 创建 Resvg 实例
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 800 },
    font: {
      loadSystemFonts: true,
    },
  })
  
  // 渲染为 PNG 缓冲区
  const buffer = resvg.render().asPng()
  
  return buffer
}
```

### 优点

- 轻量级，不依赖浏览器
- 渲染速度快
- 内存占用低
- 支持矢量图形，缩放不失真

### 缺点

- 功能相对有限，不支持复杂的 CSS 特性
- 对某些高级布局支持较差

### 实际应用

在 `koishi-plugin-onebot-info-image` 和 `koishi-plugin-music-link-vincentzyu-fork` 插件中，SVG 渲染被用作轻量级的图片生成方案。

## Typst 渲染

Typst 是一种现代的排版系统，适合生成高质量的文档和图片。

### 依赖安装

::: tabs code
```npm
npm install @myriaddreamin/typst-ts-node-compiler
```
```yarn
yarn add @myriaddreamin/typst-ts-node-compiler
```
:::

### 基本实现

以下是使用 Typst 渲染图片的基本步骤：

1. 生成 Typst 代码
2. 使用 Typst 编译器将代码编译为图片

### 示例代码

```typescript
import { compile } from '@myriaddreamin/typst-ts-node-compiler'

export async function renderWithTypst(typstCode: string) {
  // 编译 Typst 代码
  const result = await compile({
    mainFile: 'main.typ',
    content: typstCode,
    format: 'png',
    dpi: 300,
  })
  
  return result
}
```

### 优点

- 专业的排版能力，适合生成文档类图片
- 语法简洁，易于学习
- 支持数学公式、表格等复杂元素

### 缺点

- 依赖 Typst 编译器，安装体积较大
- 渲染速度相对较慢
- 学习成本较高

### 实际应用

在 `koishi-plugin-quote-debug-msg-json-image` 插件中，Typst 被用于渲染结构化数据（如 JSON、YAML、TOML）为美观的图片。

## 渲染方式对比

| 渲染方式 | 优点 | 缺点 | 适用场景 |
|---------|------|------|----------|
| Puppeteer | 支持完整 HTML/CSS，高度定制化 | 体积大，速度慢，内存占用高 | 复杂页面，需要完整浏览器功能 |
| SVG | 轻量级，速度快，内存占用低 | 功能有限，不支持复杂 CSS | 简单卡片，图标，需要快速渲染 |
| Typst | 专业排版能力，支持复杂元素 | 体积较大，速度较慢，学习成本高 | 文档类图片，需要专业排版 |

## 最佳实践

1. **根据需求选择合适的渲染方式**：
   - 对于简单的信息卡片，优先使用 SVG
   - 对于复杂的页面布局，使用 Puppeteer
   - 对于需要专业排版的文档，使用 Typst

2. **优化渲染性能**：
   - 对于 Puppeteer，使用页面缓存和资源预加载
   - 对于 SVG，优化 SVG 结构，减少不必要的元素
   - 对于 Typst，合理使用模板和组件

3. **提供多种渲染选项**：
   - 如 `onebot-info-image` 插件那样，同时支持 Puppeteer 和 SVG 渲染
   - 让用户根据设备性能和需求选择合适的渲染方式

4. **错误处理**：
   - 为每种渲染方式提供fallback方案
   - 捕获渲染错误并提供友好的错误提示

## 示例插件

以下是几个使用不同渲染方式的示例插件：

1. **onebot-info-image**：同时支持 Puppeteer 和 SVG 渲染，用于生成用户信息卡片
2. **music-link-vincentzyu-fork**：使用 SVG 渲染音乐信息卡片
3. **quote-debug-msg-json-image**：支持 Typst、Markdown 和 Puppeteer 渲染，用于生成结构化数据的图片

通过参考这些插件的实现，你可以根据自己的需求选择合适的渲染方式，为你的插件添加美观的图片输出功能。
