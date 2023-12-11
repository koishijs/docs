# Built-in Components

- 标有 <badge>会话</badge> 的组件只能在会话环境下使用 (常见的会话环境包括中间件和指令的内部)
- 标有 <badge>会话+广播</badge> 的组件只能在会话环境或 `ctx.broadcast()` 中使用

## 核心组件

### 调用指令 (execute) <badge>会话</badge>

按照子元素执行指令，并使用指令的输出替换此元素。

```html
foo<execute>echo 123</execute>bar
```

<chat-panel>
<chat-message nickname="Koishi">foo123bar</chat-message>
</chat-panel>

### 等待输入 (prompt) <badge>会话</badge>

输出子元素并等待用户输入，并使用输入内容替换此元素。

```html
你输入的内容为：<prompt>请输入一段文本。</prompt>
```

<chat-panel>
<chat-message nickname="Koishi">请输入一段文本。</chat-message>
<chat-message nickname="Alice">你好！</chat-message>
<chat-message nickname="Koishi">你输入的内容为：你好！</chat-message>
</chat-panel>

### 国际化 (i18n) <badge>会话+广播</badge>

- **path:** 本地化路径

渲染本地化文件中对应的路径替换此元素。

```html
<i18n path="foo.bar"/>
```

```yaml
foo:
  bar: Hello, world!
```

传入 `path` 为 `foo.bar` 时：

<chat-panel>
<chat-message nickname="Koishi">Hello, world!</chat-message>
</chat-panel>

### 时间 (i18n:time) <badge>会话+广播</badge>

- **value:** 时间长度（毫秒）

根据本地语言渲染时间长度。

```html
剩余时间：<i18n:time value={value}/>
```

传入 `value` 为 `114514` 时：

<chat-panel>
<chat-message nickname="Koishi">剩余时间：1 分钟 55 秒</chat-message>
</chat-panel>

### 随机选取 (random) <badge type="warning">实验性</badge>

选择随机的子元素。

```html
此次抛硬币的结果是<random>
  <template>正面</template>
  <template>反面</template>
</random>
```

<chat-panel>
<chat-message nickname="Koishi">此次抛硬币的结果是反面</chat-message>
</chat-panel>

### 复数 (plural) <badge type="warning">实验性</badge>

- **count:** 用于判断的数值

根据 `count` 数值决定选择子元素。

```html
You have <plural count={count}>
  <template>no apples</template>
  <template>one apple</template>
  <template>{count} apples</template>
</plural>.
```

传入 `count` 为 2 时：

<chat-panel>
<chat-message nickname="Koishi">You have 2 apples.</chat-message>
</chat-panel>

## 扩展组件

### 网页渲染 (html)

### 内容审查 (censor)
