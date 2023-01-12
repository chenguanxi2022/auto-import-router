> 自动引入 router 小插件（已加载 body、json 插件）

- 使用方法：使用暴露的 `init` 方法将 `koa` 实例传入即可

```js
const Koa = require("koa");
const app = new Koa();
const autoRouter = require("auto-import-router");
// 加载路由
autoRouter.init(app);
```

- 注意事项：`router` 要放在 `src` 文件夹下面，且要求无二级目录
