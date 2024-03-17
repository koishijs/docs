# 运行状态 (Status)

## 指令：status

- 快捷调用：你的状态，查看状态，运行情况，运行状态

status 指令可以用于查看机器人的运行状态。

<chat-panel>
<chat-message nickname="Alice">status</chat-message>
<chat-message nickname="Koishi">
<p>[qq] Koishi：运行中</p>
<p>[lark] Koishi：运行中</p>
<p>==========</p>
<p>CPU 使用率：0% / 1%</p>
<p>内存使用率：1% / 48%</p>
</chat-message>
</chat-panel>

### 本地化
::: tip
请参见 [入门 > 国际化](../../manual/usage/customize.md#本地化文本) 一节。
:::

## 配置项

### tickInterval

- 类型: `number`
- 默认值: `Time.second * 5`

页面同步 profile 数据的时间。
