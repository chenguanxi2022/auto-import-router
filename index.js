// 自动引入加载 router
const { koaBody } = require('koa-body')
const json = require('koa-json')
const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')

class AutoRouter {
  app
  // 单例模式
  static autoRouter = new AutoRouter()
  // 初始化方法
  init(app) {
    this.app = app
    const fileArr = this.getFileArr()
    const rootRouter = this.getRootRouter()
    this.loaderRouter(rootRouter, fileArr)
    // 加载全部路由
    this.app.use(rootRouter.routes())
  }
  // 获取路由路径数组
  getFileArr() {
    const fileArr = []
    const fullPath = path.join(process.cwd(), 'src/router')
    const files = fs.readdirSync(fullPath)
    files.forEach((item) => {
      const fileItem = fullPath + '\\' + item
      fileArr.push(fileItem)
    })
    return fileArr
  }
  // 获取一级路由
  getRootRouter() {
    const rootRouter = new Router({
      prefix: '/run',
    })
    this.app.use(koaBody())
    this.app.use(json())
    return rootRouter
  }
  // 加载路由
  loaderRouter(rootRouter, fileArr) {
    fileArr.forEach((item) => {
      const module = require(item)
      rootRouter.use(module.routes(), module.allowedMethods())
    })
  }
}

module.exports = AutoRouter.autoRouter
