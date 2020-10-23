# chain

- `项目是由vue-cli@3脚手架搭起来的`

## vue-cli 脚手架

See [Configuration Reference](https://cli.vuejs.org/config/).

## 运行环境 NodeJs

- 安装 NodeJs

[NodeJs LTS](https://nodejs.org/dist/v12.19.0/node-v12.19.0.pkg)

- 测试安装是否成功

```bash
node -v
```

```bash
# npm 是用来安装依赖包的
npm -v
```

## 安装依赖

`这里使用上一步的npm进行安装`

### 第一种方法

- 进入到根目录下
- 执行 npm install 等待依赖安装
- 安装完毕，根目录会多出一个依赖包文件夹 node_modules 和 package-lock.json

### 第二种方法

`如果自己有使用 vue-cli，可以看到它内部用的yarn安装依赖的，如果你的网络(fq)没有问题，而且能很快的使用 yarn 镜像，优先使用 yarn 安装依赖`

- 需要安装 yarn
- 全局安装 npm install -g yarn

```bash
yarn -v
```

- 进入到根目录
- 命令行输入 yarn 进行安装
- 安装完毕，根目录会多出一个依赖包文件夹 node_modules 和 yarn.lock

## 启动项目

### 服务端

`项目中已经 mock 数据了，需要打开一个命令窗，执行以下命令`

```bash
npm run server

# or

yarn server
```

- 脚本目录：./server.js
- 默认端口 2333
- 服务端启动端口为 http://localhost:2333
  - http://localhost:2333/api/overview
  - http://localhost:2333/api/block
  - http://localhost:2333/api/datas

### 客户端

`另起一个命令窗运行以下命令`

```bash
# 安装了node的情况下
npm run serve 

# or 或者

# 安装了yarn的情况下
yarn serve 
```

- 默认端口 8080
- 浏览器打开 http://localhost:8080

启动成功