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

## 示例插件

| Puppeteer | SVG | Typst |
|:----------|:----|:------|
| **onebot-info-image**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-onebot-info-image)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-onebot-info-image)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12077) | **onebot-info-image**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-onebot-info-image)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-onebot-info-image)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12077) | **quote-debug-msg-json-image**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-quote-debug-msg-json-image)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-quote-debug-msg-json-image)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12379) |
| **twitch**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-twitch)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-twitch)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12364) | **music-link-vincentzyu-fork**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-music-link-vincentzyu-fork)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-music-link-vincentzyu-fork)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12115) | **git-repo-monitor**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-git-repo-monitor)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-git-repo-monitor)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12366) |
| **git-repo-monitor**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-git-repo-monitor)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-git-repo-monitor)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12366) | | |
| **wydashen-guangyi-query**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-wydashen-guangyi-query)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-wydashen-guangyi-query)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12378) | | |
| **anime-convention-lizard-vincentzyu-fork**[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-anime-convention-lizard-vincentzyu-fork)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-anime-convention-lizard-vincentzyu-fork)[![Koishi Forum](https://img.shields.io/badge/koishi.forum.xyz-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12115) | | |

## Puppeteer 渲染

Puppeteer 是一种基于浏览器的渲染方式，通过生成 HTML 页面并截图来创建图片。

::: tip
在创建 Koishi 实例时，Puppeteer 服务已经内置，无需额外安装 `koishi-plugin-puppeteer`。你只需要在 / 控制台webui插件配置中 启用 Puppeteer 服务即可。

如果你需要使用不带 Canvas 的 Puppeteer 版本（体积更小、配置项更多），可以安装 `koishi-plugin-puppeteer-without-canvas`。
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

#### 最小的 HTML 示例

```typescript
const htmlCode = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: system-ui, sans-serif; 
      padding: 40px; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .card { background: white; color: #333; padding: 24px; border-radius: 12px; }
    h1 { margin: 0 0 16px; font-size: 24px; }
    p { margin: 0; color: #666; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello Koishi!</h1>
    <p>这是一个简单的信息卡片</p>
  </div>
</body>
</html>
`

// 使用
const page = await ctx.puppeteer.page()
await page.setContent(htmlCode)
const buffer = await page.screenshot({ type: 'png' })
await page.close()
```

参考 [koishi-plugin-twitch](https://github.com/VincentZyuApps/koishi-plugin-twitch) 插件的实际实现：

```typescript
// 1. 生成 HTML 模板（支持动态内容）
const htmlCode = `
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 24px;
      color: white;
      // ...
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>\${username}</h1>
    <p>\${status}</p>
  </div>
</body>
</html>
`

// 2. 创建页面并渲染
const page = await ctx.puppeteer.page()
await page.setViewport({ width: 800, height: 600 })
await page.setContent(htmlCode, { waitUntil: 'domcontentloaded' })

// 3. 截图并返回
const buffer = await page.screenshot({ type: 'png', fullPage: true })
await page.close()
return buffer
```

### 优点

- 支持完整的 HTML/CSS 功能
- 可以渲染复杂的页面布局和动画
- 适合需要高度定制化的场景

### 缺点

- 依赖 Chrome/Chromium 或者其他支持puppeteer的浏览器，体积较大
- 渲染速度相对较慢
- 内存占用较高

### 实际应用

在 [koishi-plugin-onebot-info-image](https://github.com/VincentZyuApps/koishi-plugin-onebot-info-image) 插件中，Puppeteer 被用于渲染用户信息卡片，支持多种样式和深色模式。
![puppeteer-example-koishi-plugin-onebot-info-image](/cookbook/practice/puppeteer-example-koishi-plugin-onebot-info-image.png)

在 [koishi-plugin-twitch](https://github.com/VincentZyuApps/koishi-plugin-twitch) 插件中，Puppeteer 被用于渲染 Twitch 直播信息卡片。
![puppeteer-example-koishi-plugin-twitch](/cookbook/practice/puppeteer-example-koishi-plugin-twitch.png)

在 [koishi-plugin-git-repo-monitor](https://github.com/VincentZyuApps/koishi-plugin-git-repo-monitor) 插件中，Puppeteer 被用于渲染 Git 仓库监控信息。
![puppeteer-example-koishi-plugin-git-repo-monitor](/cookbook/practice/puppeteer-example-koishi-plugin-git-repo-monitor.png)

在 [koishi-plugin-wydashen-guangyi-query](https://github.com/VincentZyuApps/koishi-plugin-wydashen-guangyi-query) 插件中，Puppeteer 被用于渲染光翼查询结果卡片。
![puppeteer-example-koishi-plugin-wydashen-guangyi-query](/cookbook/practice/puppeteer-example-koishi-plugin-wydashen-guangyi-query.png)

在 [koishi-plugin-anime-convention-lizard-vincentzyu-fork](https://github.com/VincentZyuApps/koishi-plugin-anime-convention-lizard-vincentzyu-fork) 插件中，Puppeteer 被用于渲染动漫展信息卡片。
![puppeteer-example-koishi-plugin-anime-convention-lizard-vincentzyu-fork](/cookbook/practice/puppeteer-example-koishi-plugin-anime-convention-lizard-vincentzyu-fork.png)

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

#### 最小的 SVG 示例

```typescript
// 简单 SVG 卡片示例
const svgCode = `
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="400" height="200" rx="12" fill="url(#bg)"/>
  <text x="200" y="100" font-family="system-ui" font-size="24" 
        fill="white" text-anchor="middle" dominant-baseline="middle">
    Hello Koishi!
  </text>
</svg>
`

// 使用 resvg 渲染
const { Resvg } = require('@resvg/resvg-js')
const resvg = new Resvg(svgCode, { fitTo: { mode: 'width', value: 800 } })
const buffer = resvg.render().asPng()
```

参考 [music-link-vincentzyu-fork](https://github.com/VincentZyuApps/koishi-plugin-music-link-vincentzyu-fork/blob/master/lib/renderer-svg.js) 插件中的实际实现：

```typescript
function generateSongListSvgString(songs, options) {
  const { darkMode, themeColor = '#7e57c2', width = 666, columns = 2 } = options
  const bgColor = darkMode ? '#0d1117' : '#ffffff'
  const cardBg = darkMode ? '#161b22' : '#f6f8fa'
  const textColor = darkMode ? '#e6edf3' : '#1f2328'
  
  const songsPerCol = Math.ceil(songs.length / columns)
  const colWidth = (width - 32) / columns
  
  let songItems = ''
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i]
    const col = Math.floor(i / songsPerCol)
    const row = i % songsPerCol
    const x = 16 + col * colWidth
    const y = 52 + row * 50
    
    songItems += `<rect x="${x}" y="${y}" width="${colWidth - 8}" height="46" rx="8" fill="${cardBg}"/>
    <text x="${x + 10}" y="${y + 20}" font-size="13" fill="${textColor}">${escapeXml(song.name)}</text>`
  }
  
  return `<svg width="${width}" height="${songsPerCol * 50 + 100}">
    <rect width="${width}" height="100%" fill="${bgColor}"/>
    <rect x="16" y="16" width="${width - 32}" height="36" rx="8" fill="${themeColor}" opacity="0.1"/>
    <text x="32" y="40" font-size="15" fill="${themeColor}">🎵 歌单</text>
    ${songItems}
  </svg>`
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

在 [koishi-plugin-onebot-info-image](https://github.com/VincentZyuApps/koishi-plugin-onebot-info-image) 和 [koishi-plugin-music-link-vincentzyu-fork](https://github.com/VincentZyuApps/koishi-plugin-music-link-vincentzyu-fork) 插件中，SVG 渲染被用作轻量级的图片生成方案。

![onebot-info-image 插件 SVG 示例](/cookbook/practice/svg-example-koishi-plugin-onebot-info-image.png)

![music-link 插件示例](/cookbook/practice/resvg-example-koishi-plugin-music-link-vincentzyu-fork.png)

## Typst 渲染

Typst 是一种现代的排版系统，适合生成高质量的文档和图片。

在 Koishi 插件生态中，Typst 渲染通常采用**两步流程**：

1. 使用 `@myriaddreamin/typst-ts-node-compiler` 将 Typst 代码**编译为 SVG**
2. 使用 `koishi-plugin-w-node` + `koishi-plugin-to-image-service`（resvgRenderer）将 **SVG 转换为 PNG 图片**

### 依赖安装

::: tabs code
```npm
npm install @myriaddreamin/typst-ts-node-compiler koishi-plugin-w-node koishi-plugin-to-image-service
```
```yarn
yarn add @myriaddreamin/typst-ts-node-compiler koishi-plugin-w-node koishi-plugin-to-image-service
```
:::

> **版本要求**：`@myriaddreamin/typst-ts-node-compiler` 需要 `>=0.5.0`，推荐使用 `^0.7.0-rc2` 或更高版本。

### 基本实现

以下是使用 Typst 渲染图片的基本步骤：

1. 生成 Typst 代码
2. 使用 Typst 编译器将代码编译为 **SVG**
3. 使用 resvgRenderer 将 SVG 渲染为 **PNG 图片**

### 示例代码

```typescript
import { Context } from 'koishi'
import type { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler'
import {} from 'koishi-plugin-to-image-service'
import {} from 'koishi-plugin-w-node'

export async function renderWithTypst(ctx: Context, typstCode: string) {
  // 1. 动态导入 typst 编译模块（通过 w-node 的 safeImport）
  const typst = await ctx.node.safeImport('@myriaddreamin/typst-ts-node-compiler')

  // 2. 创建编译器实例
  const compiler = typst.NodeCompiler.create({
    workspace: '/path/to/workspace',
  })

  // 3. 将 Typst 代码编译为 SVG
  const svg = compiler.svg({ mainFileContent: typstCode })

  // 4. 使用 resvgRenderer 将 SVG 转换为 PNG
  const pngBuffer = await ctx.toImageService.resvgRenderer.render({
    svg: svg,
    options: {
      fitTo: { mode: 'zoom', value: 2.0 },
    },
  })

  return Buffer.from(pngBuffer)
}
```

#### 最小的 Typst 示例

```typescript
// 简单 Typst 卡片示例
const typstCode = `
#set page(width: 400pt, height: 200pt, margin: 24pt)
#set text(font: "system-ui", size: 24pt, fill: white)

#rect(
  width: 100%,
  height: 100%,
  fill: gradient.linear("#667eea", "#764ba2"),
  radius: 12pt,
)[
  #align(center + horizon)[
    #text("Hello Koishi!")
  ]
]
`

// 调用渲染函数
const imageBuffer = await renderWithTypst(ctx, typstCode)
```

参考 [quote-debug-msg-json-image](https://github.com/VincentZyuApps/koishi-plugin-quote-debug-msg-json-image/blob/master/src/dump-typst.ts) 插件中的实际实现：

````typescript
function buildTypstCode(data: any, format: string, theme: TypstTheme): string {
  const codeContent = escapeTypstText(JSON.stringify(data, null, 2))
  
  return `
#set page(width: 600pt, margin: 24pt)
#set text(font: "system-ui", size: 12pt, fill: rgb("${theme.textColor}"))

#rect(
  width: 100%,
  fill: rgb("${theme.pageBg}"),
  radius: 8pt,
)[
  #set text(size: 14pt, fill: rgb("${theme.sectionTitle}"), weight: "bold")
  #text("JSON Data")
  
  #rect(
    width: 100%,
    fill: rgb("${theme.codeBlockFill}"),
    stroke: rgb("${theme.codeBlockStroke}"),
    radius: 4pt,
    padding: 12pt,
  )[````
${codeContent}
````]
]
`
}
````

Typst 的核心目标正是提供一种现代化、高性能且易于编写的学术排版系统，在学术论文和数学公式排版方面具有明显优势：

:::details 点击查看 Typst 完整示例及安装体验流程（几何 + 代数）
```typ
#import "@preview/cetz:0.3.1"

#set page(width: 21cm, height: auto, margin: 1cm)
#set text(font: "LXGW WenKai", size: 11pt)

#align(center, text(size: 18pt, weight: "bold")[红色线段长度证明])

#grid(
  columns: (1fr, 1fr),
  column-gutter: 1cm,
  // --- 左侧：几何图形 ---
  cetz.canvas({
    import cetz.draw: *

    let s_val = (2.0 * calc.sqrt(71.0) - 3.0) / 20.0
    let c_val = (6.0 + calc.sqrt(71.0)) / 20.0
    let m = 0.2

    let Ax = 0.0; let Ay = 0.0
    let Ox = 0.0; let Oy = 3.0
    let Bx = 3.0 * s_val; let By = 3.0 * c_val
    let Cx = Bx + 4.0 * c_val; let Cy = By - 4.0 * s_val
    let Dx = Cx + 5.0 * s_val; let Dy = Cy + 5.0 * c_val

    // 绘制图形
    line((x: Ox, y: Oy), (x: Dx, y: Dy), stroke: red + 2pt, name: "target")
    line((x: Ox, y: Oy), (x: Ax, y: Ay), (x: Bx, y: By), (x: Cx, y: Cy), (x: Dx, y: Dy), stroke: black + 1pt)

    // 直角标注
    line((x: Ox, y: Oy - m), (x: Ox + m, y: Oy - m), (x: Ox + m, y: Oy), stroke: 0.5pt)
    line(
      (x: Bx - m*s_val, y: By - m*c_val), 
      (x: Bx - m*s_val + m*c_val, y: By - m*c_val - m*s_val), 
      (x: Bx + m*c_val, y: By - m*s_val), 
      stroke: 0.5pt
    )
    line(
      (x: Cx - m*c_val, y: Cy + m*s_val), 
      (x: Cx - m*c_val + m*s_val, y: Cy + m*s_val + m*c_val), 
      (x: Cx + m*s_val, y: Cy + m*c_val), 
      stroke: 0.5pt
    )

    // 文字标注
    content((x: Ox, y: Oy), [O], anchor: "south-east", padding: .2)
    content((x: Ax, y: Ay), [A], anchor: "north-east", padding: .2)
    content((x: Bx, y: By), [B], anchor: "south", padding: .2)
    content((x: Cx, y: Cy), [C], anchor: "north", padding: .2)
    content((x: Dx, y: Dy), [D], anchor: "south-west", padding: .2)

    content((x: -0.3, y: 1.5), [3])
    content((x: Bx/2.0 - 0.3, y: By/2.0 + 0.1), [3])
    content((x: (Bx+Cx)/2.0 + 0.1, y: (By+Cy)/2.0 + 0.3), [4])
    content((x: (Cx+Dx)/2.0 + 0.3, y: (Cy+Dy)/2.0 + 0.1), [5])

    content((x: Dx/2.0, y: Oy + 0.4), [$sqrt(71)$], fill: red)
  }),

  // --- 右侧：文字说明 ---
  [
    == 1. 几何模型
    根据原图信息，标注顶点为 $O, A, B, C, D$：
    - *已知长度*：
      $O A=3, A B=3, B C=4, C D=5$。
    - *直角约束*：
      $angle O A B, angle A B C, angle B C D$ 均为 $90^degree$。
    - *目标*：
      求水平线段 $O D$ 的长度 $t$。
    
    #v(1em)
    > *注：* 红色线段 $O D$ 在此几何配置下被锁定为唯一解。
  ]
)

---

== 2. 代数解析
#set math.equation(numbering: "(1)")
设 $A B$ 与垂直方向的夹角为 $alpha$。

=== 2.1 建立方程
根据垂直位移平衡（$y$ 轴总位移为 0）：
$ 3 cos alpha - 4 sin alpha + 5 cos alpha = 3 $
整理得：
$ 8 cos alpha - 4 sin alpha = 3 quad => quad 8 cos alpha = 3 + 4 sin alpha $

=== 2.2 联立求解
将上式平方并利用 $cos^2 alpha + sin^2 alpha = 1$：
$ 64 (1 - sin^2 alpha) = (3 + 4 sin alpha)^2 \
80 sin^2 alpha + 24 sin alpha - 55 = 0 $

解得：
$ sin alpha = (2 sqrt(71) - 3) / 20, quad cos alpha = (6 + sqrt(71)) / 20 $

=== 2.3 求解目标长度 $t$
$ t &= 3 sin alpha + 4 cos alpha + 5 sin alpha = 8 sin alpha + 4 cos alpha \
    &= 8 dot ((2 sqrt(71) - 3) / 20) + 4 dot ((6 + sqrt(71)) / 20) \
    &= sqrt(71) $

== 3. 结论
红色线段长度为 $bold(sqrt(71)) approx 8.426$。
```

![Typst 数学示例](/cookbook/practice/typst-quick-test-math-geometry-algebra.png)

想快速测试 Typst？将上面的 Typst 代码保存为 `testmath.typ`，然后在同级目录下运行以下命令即可渲染为 PNG。安装方式请参考 [Typst 官方仓库](https://github.com/typst/typst)。

```bash
typst compile ./testmath.typ ./testmath.png
```
:::

### 优点

- 专业的排版能力，适合生成文档类图片
- 语法简洁，易于学习
- 支持数学公式、表格等复杂元素

### 缺点

- 依赖 Typst 编译器，安装体积较大
- 渲染速度相对较慢
- 学习成本较高

### 实际应用

在 [koishi-plugin-quote-debug-msg-json-image](https://github.com/VincentZyuApps/koishi-plugin-quote-debug-msg-json-image) 插件中，Typst 被用于渲染结构化数据（如 JSON、YAML、TOML）为美观的图片。

![Typst 示例 - Git Repo Monitor](/cookbook/practice/typst-example-koishi-plugin-git-repo-monitor.png)

![Typst 示例 - Quote Debug](/cookbook/practice/typst-example-koishi-plugin-quote-debug-msg-json-image.png)

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
   - 如 `onebot-info-image` 和 `music-link-vincentzyu-fork` 插件那样，同时支持 Puppeteer 和 SVG 渲染
   - 让用户根据设备性能和需求选择合适的渲染方式

4. **错误处理**：
   - (可选)为每种渲染方式提供fallback方案，比如出图失败就返回文字or报错信息
   - 捕获渲染错误并提供友好的错误提示(比如简要的发在聊天平台，详细的发在日志)

## 本页提到的插件

| 插件名 | 功能 | 渲染方式及作用 |
|--------|------|----------------|
| git-repo-monitor[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-git-repo-monitor)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-git-repo-monitor)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12366) | 监控 Git 仓库（GitHub/Gitee）的提交、Release 等变化并推送通知 | 使用 **Typst** 渲染精美的仓库动态卡片图片，支持语法高亮和格式化，比纯文本更美观易读 |
| anime-convention-lizard-vincentzyu-fork[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-anime-convention-lizard-vincentzyu-fork)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-anime-convention-lizard-vincentzyu-fork)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12115) | 查询动漫展信息，例如 ChinaJoy、COMICUP 等展会的票务、场馆、嘉宾等 | 使用 **Puppeteer** 渲染动漫展信息卡片，展示展会详情和票务信息，提升阅读体验 |
| music-link-vincentzyu-fork[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-music-link-vincentzyu-fork)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-music-link-vincentzyu-fork)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12115) | 搜索并下载 QQ音乐/网易云音乐，支持付费歌曲 | 使用 **Puppeteer** 渲染音乐搜索结果为图片卡片，展示歌曲封面、歌手等信息，提升用户体验 |
| onebot-info-image[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-onebot-info-image)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-onebot-info-image)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12077) | 通过 OneBot API 获取用户详细信息、群管理员列表 | 使用 **SVG (resvg)** 渲染用户/群信息卡片，支持 emoji 表情渲染，生成精美的图片消息 |
| quote-debug-msg-json-image[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-quote-debug-msg-json-image)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-quote-debug-msg-json-image)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12379) | 将消息的 JSON/YAML/TOML 数据结构渲染成图片 | 支持 **Typst** 渲染代码/数据结构，支持自定义 syntax 文件实现语法高亮，也可用 **Puppeteer** 渲染 OneBot 合并转发消息为图片 |
| twitch[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-twitch)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-twitch)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12364) | 监控 Twitch 主播开播状态并推送通知 | 支持多种消息格式，可配合 **Puppeteer** 渲染精美的开播通知卡片图片，易读美观 |
| wydashen-guangyi-query[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/koishi-plugin-wydashen-guangyi-query)[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/koishi-plugin-wydashen-guangyi-query)[![Koishi Forum](https://img.shields.io/badge/Forum-5546A3?style=for-the-badge&logo=koishi.js&logoColor=white)](https://forum.koishi.xyz/t/topic/12378) | 查询光遇国服光翼收集情况 | 使用 **Puppeteer** 渲染光翼地图卡片，直观展示收集进度 |


