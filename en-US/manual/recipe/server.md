# Deployment

Koishi apps can only be accessed from localhost by default. You might need to access the Koishi Console or services provided by other plugins on the Internet.

- Allow more people to access your Koishi console
- 使用作为 webhook 服务端的插件 (例如 [github](https://github.koishi.chat) 和部分适配器插件)

This section would guide you in completing the deployment for a Koishi application.

## 配置用户登录

将 Koishi 不受限制地暴露在公网上可能会导致你的服务器受到攻击。因此，你需要妥善配合用户登录等方式以限制控制台功能的访问能力。

在 [前面的章节](../usage/platform.md#控制台登录) 中，我们已经介绍了 [auth](../../plugins/console/auth.md) 插件的使用方法。

## 配置服务器地址

[@koishijs/plugin-server](../../plugins/develop/server.md) 是一个预装插件。

前往「插件配置」页面，找到 server 插件，并将 `host` 修改为 `0.0.0.0`，随后点击右上角的「重载配置」。等待插件重启之后，你就可以使用 `IP:端口` 的方式，在局域网内任意设备的浏览器上访问到 Koishi 控制台了。

如果你已经准备了域名，你还需要同时将 `selfUrl` 修改为能访问到 Koishi 实例的地址。

## 配置反向代理

Reverse proxies are useful if you have more complex needs such as SSL and server name etc. Common solutions include nginx, Caddy, etc. 使用反向代理时，你不需要修改上述 `host` 配置项。

### Use Caddy

```text
# If you want to use a domain and also a SSL certificate
# please change the :80 below to your domain
# https://caddyserver.com/docs/caddyfile
:80 {
  reverse_proxy http://127.0.0.1:5140
}
```

### Use nginx

Below is a nginx configuration for reference:

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

Once the initial configuration has been completed, there are some additional community plugins to help you better deploy the Koishi Console.

### Add filing information

If your server is in the Mainland of China, you need to add the filing information inquiry to your console to be able to access it successfully on the Internet.此时你可以使用 [footer](https://github.com/koishijs/koishi-plugin-footer) 等插件来完成配置。
