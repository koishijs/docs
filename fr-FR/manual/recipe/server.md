# Déploiement

::: warning
将 Koishi 暴露在公网上可能会导致你的服务器受到攻击。你需要妥善配合 [用户登录](../usage/platform.md#控制台登录) 等方式以限制控制台功能的访问能力。
:::

Koishi 应用默认情况下只能在本机访问。而对于某些需求，你可能希望在公网上访问到 Koishi 的控制台或其他网络服务：

- 让更多人访问到你的 Koishi 控制台
- 使用作为 webhook 服务端的插件 (例如 [github](https://github.koishi.chat))

本节教程将指导你完成 Koishi 应用的公网部署。

## 直接暴露

点击控制台左侧的「插件配置」，选择「全局配置」并将 `host` 修改为 `0.0.0.0`，随后点击右上角的「重载配置」。等待 Koishi 重启之后，你就可以使用 `IP:端口` 的方式，在局域网内任意设备的浏览器上访问到 Koishi 控制台了。

如果你已经准备了域名，你还需要同时将 `selfUrl` 修改为能访问到 Koishi 实例的地址。

## 反向代理

如果你有更复杂的需求，例如配置 SSL、域名等，可以使用反向代理。常见的方案有 nginx、Caddy 等。使用反向代理时，你不需要修改上述 `host` 配置项。

### 使用 Caddy

```text
# 如果你希望使用域名，并自动签发 SSL 证书，请将下方 :80 改为你的域名
# https://caddyserver.com/docs/caddyfile
:80 {
  reverse_proxy http://127.0.0.1:5140
}
```

### 使用 nginx

下面给出一段 nginx 配置作为参考：

```text
# http://nginx.org/en/docs/http/websocket.html
map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  # server_name, port, ssl 等设置

  location / {
    # 这里的 5140 对应 Koishi 实例的端口
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

## 接下来……

完成初步配置以后，有一些额外的社区插件可以帮助你更好地部署 Koishi 控制台。

### 添加备案信息

如果你的服务器在国内，你需要在控制台中添加备案信息，才能在公网上顺利访问。此时你可以使用 [footer](https://github.com/koishijs/koishi-plugin-footer) 等插件来完成配置。
