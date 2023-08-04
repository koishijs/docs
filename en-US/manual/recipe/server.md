# Deployment

::: warning
It is vulnerable when you expose your Koishi on the Internet. You might need to limit the accessibility with [User Authorization](../usage/platform.md#控制台登录) or something else.
:::

Koishi apps can only be accessed from localhost by default. You might need to access the Koishi Console or services provided by other plugins on the Internet.

- Allow more people to access your Koishi console
- Use plugins as webhook servers (for example [github](https://github.koishi.chat))

This section would guide you in completing the deployment for a Koishi application.

## Direct Exposure

Click "Plugins Configuration" on the left side of the console, select "Global Configuration" and change `host` to `0.0.0.0`, then click "Reload Configuration" in the top right.After Koishi restarts, you can use `IP:Port` to visit Koishi Console on any device on the LAN network.

If you have already prepared a domain, you also need to modify `selfUrl` to address that you can access the Koishi instance.

## Reverse Proxy

Reverse proxies are useful if you have more complex needs such as SSL and server name etc. Common solutions include nginx, Caddy, etc. You do not need to modify the `host` configuration item above when using reverse proxy.

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

If your server is in the Mainland of China, you need to add the filing information inquiry to your console to be able to access it successfully on the Internet.Then you can use plugins (like [footer](https://github.com/koishijs/koishi-plugin-footer)) to complete the configuration.
