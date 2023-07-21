const CommentDao = require("../dao/commentDao");

module.exports = {
    addComment: async (req, res) => {
        await CommentDao.addComment(req, res);
    },
    getComments: async (req,res)=>{
        await CommentDao.getComments(req,res);
    }
}