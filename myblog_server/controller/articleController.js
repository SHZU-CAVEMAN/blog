const ArticleDao = require("../dao/articleDao")

module.exports = {
    add: async (req,res) =>{
        // let  {name}  = ctx.request.body;
        await ArticleDao.addArticle(req,res);
        // console.log(ctx.request.body);//成功获取了前端的参数
    },
    getAll: async (req,res) =>{
        await ArticleDao.getAllarticles(req,res);

  
    }
}