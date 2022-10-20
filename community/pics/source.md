---
sidebarDepth: 2
noTwoslash: true
---

# 图源插件

图源插件是一类 pics 的附属插件，由其他 Koishi 插件提供，以提供从平台获取随机图片的功能。



## 开发图源插件

图源插件可以使用 pics 内置的 PlainPicSourcePlugin 基类开发，也可以使用 [koishi-thirdeye](../decorator/thirdeye.md) 以装饰器的方式开发。推荐在 `package.json` 内写上下面的内容以保证正确被 Koishi 插件市场搜索。

```json
{
  "koishi": {
    "service": {
      "required": ["pics"]
    }
  }
}
```

### 直接开发

图源插件是从 PlainPicSourcePlugin 基类继承的类插件，您只需要继承该类即可完成图源插件的开发。图源插件需要实现 `randomPic` 方法，并返回一个包含 `url` 字段的对象。

此外，PlainPicSourcePlugin 基类会自动处理插件描述配置模式的合并，您只需要提供**插件特有的**配置属性。此外，由于基类中的 name 属性是必需属性，您可能希望给插件赋予一个默认的图源名称，这时候您需要在插件配置中重写 name 属性。

我们以 [Lolicon](https://api.lolicon.app/) 为例，开发一个 Lolicon 图源插件。


```ts title=lolicon.ts
import { Context, Schema } from "koishi"
import { PlainPicSourcePlugin } from "koishi-plugin-pics"

const base = PlainPicSourcePlugin({
  name: Schema.string('图源名称').default('lolicon'), // 重写 name 方法
  r18: Schema.number('图片的 R18 模式').default(2),
})

export default class LoliconSource extends base {
  // 由于插件元数据无法从基类继承，因此需要手动赋值
  static Config = base.Config
  static using = ['pics'] as const
  static reusable = true // 注册为可重用插件

  async randomPic(tags: string[]) {
    // 从 Lolicon 获取图源
    const result = await this.ctx.http.post(
      'https://api.lolicon.app/setu/v2',
      {
        r18: this.config.r18,
        num: 1,
        tag: picTags,
      },
    )
    const data = result.data[0]
    if(!data) {
      // 没有找到图片
      return
    }
    return {
      url: data.urls.original,
      description: data.title,
    }
  }
}
```


然后使用下面的配置即可加载这个插件了：

```yaml title=koishi.yml
plugins:
  pics:
    commandName: pic
  ./lolicon:
    name: lolicon
    weight: 1
    isDefault: true
    r18: 2
```

### 使用装饰器

图源插件也可以使用 [koishi-thirdeye](../decorator/thirdeye.md) 以装饰器的形式进行开发。这时候，图源插件需要从 `PicSourcePlugin(Config)` 基类进行继承。使用装饰器编写的图源插件无需重新覆盖 Config 以及 using 等插件元数据。

上例中的 Lolicon 图源插件可以写成下面的形式：

```ts title=lolicon.ts
import { Context, Quester } from "koishi"
import { DefinePlugin, RegisterSchema, SchemaProperty, Inject } from "koishi-thirdeye"
import { PicSourcePlugin, PicsContainer } from "koishi-plugin-pics"

@RegisterSchema()
export class Config {
  @SchemaProperty({ description: '图源名称', default: 'lolicon' }) // 推荐覆盖该属性以提供默认值
  name: string
  
  @SchemaProperty({ description: '图片的 R18 模式', default: 2 })
  r18: number
}


@DefinePlugin()
export default class LoliconSource extends PicSourcePlugin(Config) {
  @Inject(true)
  private http: Quester

  async randomPic(tags: string[]) {
    // 从 Lolicon 获取图源
    const result = await this.http.post(
      'https://api.lolicon.app/setu/v2',
      {
        r18: this.config.r18,
        num: 1,
        tag: picTags,
      },
    )
    const data = result.data[0]
    if(!data) {
      // 没有找到图片
      return
    }
    return {
      url: data.urls.original,
      description: data.title,
    }
  }
}
```

您可以注意到，我们配置的插件选项只有 `name` 和 `r18` 两个属性，但是我们加载插件的时候还使用了 `weight` 和 `isDefault` 等属性，似乎并没有定义。实际上，`PicSourcePlugin` 基类生成器会自动生成图源插件所必需的属性，我们无需在每个插件中都指定一遍。这些字段可以在前面的[配置](./configuration.md#图源插件共同配置)一节中来查看。

此外，`PicSourcePlugin` 基类已经声明自身为可重用插件了，您无需再次使用 `@Reusable()` 装饰器来再次声明。

而真正的 [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) 插件的逻辑比上面这个例子复杂得多，您可以从参考该插件的源代码了解更多详情。

#### 插件基类

`PicSourcePlugin(Config)` 生成基类具有这些预定义属性，可以直接使用。

- **pics:** pics 服务本身，并已标记为服务依赖。
- **logger:** 日志记录器。
