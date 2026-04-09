---
url: /api/message/components.md
---
# 内置组件

* 标有 会话 的组件只能在会话环境下使用 (常见的会话环境包括中间件和指令的内部)
* 标有 会话+广播 的组件只能在会话环境或 `ctx.broadcast()` 中使用

## 核心组件

### 调用指令 (execute) 会话

按照子元素执行指令，并使用指令的输出替换此元素。

```html
foo<execute>echo 123</execute>bar
```

### 等待输入 (prompt) 会话

输出子元素并等待用户输入，并使用输入内容替换此元素。

```html
你输入的内容为：<prompt>请输入一段文本。</prompt>
```

### 国际化 (i18n) 会话+广播

* **path:** 本地化路径

渲染本地化文件中对应的路径替换此元素。

```html
<i18n path="foo.bar"/>
```

```yaml
foo:
  bar: Hello, world!
```

传入 `path` 为 `foo.bar` 时：

这个组件也可以配合插值使用：

```html
<i18n path="foo.bar">{'Koishi'}</i18n>
```

```yaml
foo:
  bar: Hello, {0}!
```

### 时间 (i18n:time) 会话+广播

* **value:** 时间长度（毫秒）

根据本地语言渲染时间长度。

```html
剩余时间：<i18n:time value={value}/>
```

传入 `value` 为 `114514` 时：

### 随机选取 (random) 实验性

选择随机的子元素。

```html
此次抛硬币的结果是<random>
  <template>正面</template>
  <template>反面</template>
</random>
```

### 复数 (plural) 实验性

* **count:** 用于判断的数值

根据 `count` 数值决定选择子元素。

```html
You have <plural count={count}>
  <template>no apples</template>
  <template>one apple</template>
  <template>{count} apples</template>
</plural>.
```

传入 `count` 为 2 时：

## 扩展组件

### 网页渲染 (html) 需要 Puppeteer

* **style:** HTML 中 `body` 标签的 `style` 属性

调用 Puppeteer 渲染给定 HTML。

JSX 中的 `html` 将被转化为为 HTML 中的 `body` 标签。

```html
<html style={"color: purple;"}>
  <h1>This is a header</h1>
  <p>Hello Puppeteer!</p>
</html>
```

你也可以为 `style` 属性指定一个对象：

```html
<html style={{
  color: "purple",
}}>
  <h1>This is a header</h1>
  <p>Hello Puppeteer!</p>
</html>
```

如果你需要向 HTML 的 `head` 标签中添加 CSS 等页面属性，可以将它们包裹在 `head` 中。下面是一个例子：

```html
<html>
  <head>
    <style>
      {`
        body {
          color: "purple"
        }
      `}
    </style>
  </head>

  <h1>This is a header</h1>
  <p>Hello Puppeteer!</p>
</html>
```

### 内容审查 (censor)
