const db = require('../db.js')

const  dao = {
    addComment(req,res){
        const { nickname, email, other, comment, time,  toWhich,toWhom,article,avatar,likeNumber} = req.body;
        const sql = 'insert into comments values(null,?,?,?,?,?,?,?,?,?,?)';
        db.query(sql,[ nickname, email, other, comment, time, toWhich,toWhom,article,avatar,likeNumber],(err,result)=>{
            if (err) return console.log(err.message);
            var data = JSON.parse(JSON.stringify(result)); //去除了烦人的 RowDataPacket 
            console.log(data);
            console.log("插入评论数据成功！");
        })
    },
    getComments(req,res){
        const sql = 'select * from comments';
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            var data = JSON.parse(JSON.stringify(results)); //去除了烦人的 RowDataPacket
            res.send({
                status: 0,
                data: data,
            });

        });
    }
}

module.exports = dao;