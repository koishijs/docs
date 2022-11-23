# 工具链更新

## JSX 支持 (v4.10.3)

在 v4.10.3 版本中，我们正式引入了 JSX 支持。这意味着你可以在插件中使用 JSX 语法来构造消息元素了。要实现这一点，你需要对你的项目进行一些配置：

1. 打开 `tsconfig.base.json` 文件并加入以下配置：

```json{3-4}
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@satorijs/element",
  },
}
```

2. 将要使用 JSX 的文件后缀名修改为 `.tsx`。
