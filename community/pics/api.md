---
sidebarDepth: 2
noTwoslash: true
---

# API

pics 本身会导出为一个服务，具有这些方法。您可以使用这些方法进行获取图片或管理图源等资源。

## 获取图片

- `randomPic(picTags: string[] = [], sourceTags: string[] = []): Promise<{ url: string, description?: string }>` 获取随机图片。
- `getSegment(url: string, bot?: Bot): Promise<string>` 从图片 URL 获取消息段。 **由于 OneBot 的一些对接原因，OneBot 机器人所使用的格式与其他机器人不同，因此需要传入机器人判别。**

## 图源管理

- `addSource(source: PicSource)` 进行图源注册。会自动处理插件卸载相关逻辑。

## 中间件管理

- `middleware(mid: PicMiddleware)` 注册图像处理中间件。

## 辅助方法

- `urlToBuffer(url: string, extraConfig: AxiosRequestConfig = {}): Promise<Buffer>` 从图片 URL 下载为 Buffer 数据。
- `bufferToUrl(buffer: Buffer): string` 从 Buffer 转换为 `base64://` 形式的 URL。
- `download(url: string, extraConfig: AxiosRequestConfig = {})` 从图片 URL 转换为 `base64://` 形式的 URL。

## 示例

```ts
import type {} from 'koishi-plugin-pics' // 你需要导入 pics 插件的类型定义

await ctx.pics.randomPic(['komeiji koishi'], ['lolicon']) //-> { url: string, description?: string }
```
