# Deployment

By default, the Koishi application is only accessible on the local machine. However, you might want to access the Koishi console or other web services from Internet for some certain reason:

- Allowing more people to access your Koishi console
- Using plugins that serve as a webhook server (e.g., [GitHub](https://github.koishi.chat) and some adapter plugins)

This tutorial will guide you through the process of deploying the Koishi application on the Internet.

## Configure User Authentication

Exposing a Koishi application to the Internet without restrictions could lead to attacks on your server. Therefore, you need to properly configure user authentication and other measures to restrict access to the console features.

In the [previous section](../usage/platform.md#console-login), we introduced how to use the [auth](../../plugins/console/auth.md) plugin.

## Configuring the Server URL

[@koishijs/plugin-server](../../plugins/develop/server.md) 是一个预装插件。

前往「插件配置」页面，找到 server 插件，并将 `host` 修改为 `0.0.0.0`，随后点击右上角的「重载配置」。等待插件重启之后，你就可以使用 `IP:端口` 的方式，在局域网内任意设备的浏览器上访问到 Koishi 控制台了。

如果你已经准备了域名，你还需要同时将 `selfUrl` 修改为能访问到 Koishi 实例的地址。

## 配置反向代理

If you are about to configure SSL, domain, and other more complex options, you could use a reverse proxy server. Common solutions include nginx, Caddy, and others. You do not need to change the host setting mentioned above if you are using a reverse proxy server.

### Use Caddy

```text
# If you want to use a domain name and automatically issue an SSL certificate,
# replace :80 with your domain below
# https://caddyserver.com/docs/caddyfile
:80 {
  reverse_proxy http://127.0.0.1:5140
}
```

### Use nginx

Here is an example of nginx configuration for reference:

```text
# http://nginx.org/en/docs/http/websocket.html
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  # server_name, port, ssl, etc.

  location / {
    # The port 5140 is listened by a Koishi application
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

## Next Steps

After completing the initial configuration, there are some additional community plugins that can help you better deploy the Koishi WebUI.

### Adding ICP Filing (China Only)

If your server is located in China mainland, you need to add ICP filing to the WebUI before it is accessible in the Internet.此时你可以使用 [footer](https://github.com/koishijs/koishi-plugin-footer) 等插件来完成配置。
