// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
    },
  },
	lintOnSave:false, //关闭语法检查
	//开启代理服务器（方式一）
  //这种方式只能请求一个服务器，而且不能控制代理服务器是否要转发给远程服务器，本身（public）就有的资源不会再去请求。
	// devServer: {
  //   proxy: 'http://localhost:3001'
  // }, 
  
	// 开启代理服务器（方式二）
	// devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3001',
	// 			pathRewrite:{'^/api':''},
  //       // ws: true, //用于支持websocket
  //       // changeOrigin: true //用于控制请求头中的host值，为ture则远程服务器会把代理服务器地址当成和自己一样的。
  //     },

  //     // '/demo': {
  //     //   target: 'http://localhost:5001',
	// 		// 	pathRewrite:{'^/demo':''},
  //       // ws: true, //用于支持websocket
  //       // changeOrigin: true //用于控制请求头中的host值
  //     // }
  //   }
  // }
}