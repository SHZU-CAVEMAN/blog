//为什么要把uploadFiles替换掉    ？？？？
// module.exports = async (ctx, next) => {
//     if (ctx.url.startsWith('/uploadFiles')) {
//       //在这里根据文章id找到文章标题，并且将前端传来的文章id 转换为 文章标题
//       // console.log(ctx.url.slice(13));//截取了前端路由/uploiadFiles后面的部分
//       ctx.url = ctx.url.replace('/uploadFiles', '');
//     }
//     await next();
//   }
  module.exports = async (req, next) => {
    if (req.url.startsWith('/uploadFiles')) {
      //在这里根据文章id找到文章标题，并且将前端传来的文章id 转换为 文章标题
      // console.log(ctx.url.slice(13));//截取了前端路由/uploiadFiles后面的部分
      ctx.url = ctx.url.replace('/uploadFiles', '');
    }
    await next();
  }