基于Vue2.0，Express.js，Ant-Design-Vue

支持最基本的博客功能：
- 编写文章（v-md-editor插件）
- 评论功能
- 文章目录
- 文章分类和展示

### 1、进入 myblog_client，安装依赖 ：
```
npm intall
```
安装Ant-Design-Vue依赖时可能会报错。因为项目中使用了eslint检验。命令后面加一句--legacy-peer-deps，告诉eslint忽略掉不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本modules共存。
 --legacy-peer-deps：在安装时忽略所有 peerDependencie。

### 2、打包：
```
npm run build
```
将打包后 dist 文件夹的内容复制到 myblog_server 根目录下 public 夹中

### 3、进入 myblog_server，运行服务器：
```
node app.js
```
打包时原先在 vue.config.js 中配置的 proxy 不会被打包进去，需要在服务端配置反向代理，可以使用nginx进行配置。
