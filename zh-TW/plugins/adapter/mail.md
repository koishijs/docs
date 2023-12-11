# @koishijs/plugin-adapter-mail

## 接入方式

1. 「username」对应你的邮箱账号，「password」对应你的授权码
2. 「imap」对应接收服务器，「smtp」对应发送服务器，需要分别填写对应的「host」和「port」
3. 不同邮箱服务获取授权码的方式也有所不同，可以参考下面的主流邮件服务进行配置

### QQ 邮箱

- 接收服务器：`imap.qq.com`，端口号 `993`
- 发送服务器：`smtp.qq.com`，端口号 `465` 或 `587`
- 参考：[什么是授权码，它又是如何设置？](https://service.mail.qq.com/detail/0/75)

### 网易 163 邮箱

- 接收服务器：`imap.163.com`，端口号 `993`
- 发送服务器：`smtp.163.com`，端口号 `465` 或 `994`
- 参考：[网易邮箱 IMAP 服务](https://mail.163.com/html/110127_imap/index.htm)

### Outlook

- 接收服务器：`outlook.office365.com`，端口号 `993`
- 发送服务器：`smtp-mail.outlook.com`，端口号 `587`
- 参考：[Outlook.com 的 POP、IMAP 和 SMTP 设置](https://support.microsoft.com/zh-cn/office/outlook-com-%E7%9A%84-pop-imap-%E5%92%8C-smtp-%E8%AE%BE%E7%BD%AE-d088b986-291d-42b8-9564-9c414e2aa040)

### Gmail

- 接收服务器：`imap.gmail.com`，端口号 `993`
- 发送服务器：`smtp.gmail.com`，端口号 `465`
- 参考：[通过其他电子邮件平台查看 Gmail](https://support.google.com/mail/answer/7126229?hl=zh-Hans#zippy=%2C%E7%AC%AC-%E6%AD%A5%E6%A3%80%E6%9F%A5-imap-%E6%98%AF%E5%90%A6%E5%B7%B2%E5%90%AF%E7%94%A8%2C%E7%AC%AC-%E6%AD%A5%E5%9C%A8%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%B8%AD%E6%9B%B4%E6%94%B9-smtp-%E5%92%8C%E5%85%B6%E4%BB%96%E8%AE%BE%E7%BD%AE)

## 配置项

### options.username

- 类型: `string`
- 必需参数

用户名。

### options.password

- 类型: `string`
- 必需参数

密码或授权码。

### options.selfId

- 类型: `string`
- 默认值: [`options.username`](#options-username)

邮件地址 (默认与用户名相同)。

### options.subject

- 类型: `string`

机器人发送的邮件主题。

### options.imap

- **imap.host:** `string` 服务器地址
- **imap.port:** `number` 服务器端口
- **imap.tls:** `boolean` 是否开启 TLS 加密

接收服务器配置。

### options.smtp

- **smtp.host:** `string` 服务器地址
- **smtp.port:** `number` 服务器端口
- **smtp.tls:** `boolean` 是否开启 TLS 加密

发送服务器配置。
