# 关于项目

> 用到的技术

[vue2.x 版本](https://cn.vuejs.org/) [vue-router](https://router.vuejs.org/zh/) [vue-cli](https://cli.vuejs.org/zh/guide/) [element-ui](https://element.eleme.cn/#/zh-CN/component/installation) [sass sass-loader](https://github.com/webpack-contrib/sass-loader)

> 项目拓展

[vue3.0 版本](https://v3.vuejs.org/api/) [vuex vue 状态管理]()

## 目录

- public 开发模式静态文件服务器指向
- src 开发目录

  - assets 放一些全局资源文件（图片 CSS JS）
  - components 自己封装的一些组件，以便复用
  - utils 工具函数

    - request Http 请求封装（需要改动 http 请求方式，请求头，请求体可以在这修改，或者直接写过封装）
    - ...

  - app.scss 全局样式（命名随便，不一定放在这里目录）
  - App.vue 用一个 Vue 文件，作为 Vue 的入口文件，这里不是项目的入口文件
  - main.js 项目的入口文件
  - routes.js 配置路由（使用的是 vue-router）
  - xxx.vue 组件页面

- .gitignore git 忽略上传文件
- .prettierrc 可以安装插件 prettier（vscode）格式化代码插件
- .babel.config.js babel 配置文件
- package.json 项目脚本以及依赖
- server.js mock 文件（Nodejs + express)
- vue.config.js 项目配置文件

## 开发

### element-ui 组件

[element-ui 组件地址](https://element.eleme.cn/#/zh-CN/component/installation)

- 这里使用的是按需加载（如果需要使用某个组件，在入口文件引入，然后使用）

### Http 请求

- 项目封装了 \$http 请求函数

```js
// 想要在 vue 组件实例当中使用 this.xx 实例对象
const vm = new Vue();
// 可以挂在到 Vue 的原型上
Vue.prototype.$http = request;
// 需要在项目入口文件中挂载 main.js
```

### vue.config.js 一些常用配置

[vue-cli 完整配置参考](https://cli.vuejs.org/zh/config/)

- devServer 启动服务相关

  - port 启动端口(可能被命令行参数覆盖)
  - proxy 代理请求地址
  - xxx

- publicPath 指定子路径 localhost:8080/my-app/xxx (配置 => publicPath: 'my-app')

## 构建

npm run build

### 打包压缩文件

> 生成文件夹

- /dist/\* 打包文件

## 部署

> 单页面项目，只要一个入口 dist/index.html

### hash 路由

- vue-router 使用 hash 路由（url 上携带 #）

```js
// 在入口文件 main.js 配置
const router = new VueRouter({
  mode: 'hash',
});
```

- history 路由

- vue-router 使用 history 路由（正常看到的 url）

```js
// 在入口文件 main.js 配置
const router = new VueRouter({
  mode: 'history',
});
```

### nginx 配置

**如果使用的浏览器路由**

- 如果访问 /user/1 会去访问当前地址，而我们项目是单页面系统，只有一个入口文件 index.html，所以跳转还需服务端配置的支持，路由才会正常的访问

```conf
# try_files
location / {
  # 实际情况实际配置
  # etc.
  try_files $uri $uri/ /index.html;
}
```
