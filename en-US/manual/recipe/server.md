# Deployment

::: warning
It is vulnerable when you expose your Koishi on the Internet. You might need to limit the accessibility with [User Authorization](../usage/platform.md#控制台登录) or something else.
:::

Koishi apps can only be accessed from localhost by default. You might need to access the Koishi Console or services provided by other plugins on the Internet.

- Allow more people to access your Koishi console
- 使用作为 webhook 服务端的插件 (例如 [github](https://github.koishi.chat))

This section would guide you in completing the deployment for a Koishi application.

## Direct Exposure

点击控制台左侧的「插件配置」，选择「全局配置」并将 `host` 修改为 `0.0.0.0`，随后点击右上角的「重载配置」。等待 Koishi 重启之后，你就可以使用 `IP:端口` 的方式，在局域网内任意设备的浏览器上访问到 Koishi 控制台了。

如果你已经准备了域名，你还需要同时将 `selfUrl` 修改为能访问到 Koishi 实例的地址。

## Reverse Proxy

Reverse proxies are useful if you have more complex needs such as SSL and server name etc. Common solutions include nginx, Caddy, etc. 使用反向代理时，你不需要修改上述 `host` 配置项。

### Use Caddy

```text
# 如果你希望使用域名，并自动签发 SSL 证书，请将下方 :80 改为你的域名
# https://caddyserver.com/docs/caddyfile
:80 {
  reverse_proxy http://127.0.0.1:5140
}
```

### Use nginx

下面给出一段 nginx 配置作为参考：

```text
# http://nginx.org/en/docs/http/websocket.html
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  # server_name, port, ssl, etc.

  location / {
    # 5140 corresponds to app.config.port
    proxy_pass http://127.0.0.1:5140/;
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $http_host;
    proxy_read_timeout 300s;
    proxy_send_timeout 300s;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
  }
}
```

## What's Next...

完成初步配置以后，有一些额外的社区插件可以帮助你更好地部署 Koishi 控制台。

### Add filing information

If your server is in the Mainland of China, you need to add the filing information inquiry to your console to be able to access it successfully on the Internet.此时你可以使用 [footer](https://github.com/koishijs/koishi-plugin-footer) 等插件来完成配置。
