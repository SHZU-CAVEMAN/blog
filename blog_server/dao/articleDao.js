const db = require('../db.js');

const dao = {
    //addArticle方法 操作两个表：添加文章信息，同时给category表添加信息。
    addArticle(req, res) {
        // 如果插入文章信息的标题为空，则不操作：在编辑文章时必须要填写文章名
        if (req.body.name == '' || req.body.category == '') {
            console.log("必须填写文章标题和分类！");
            return;
        }
        /*
        图片数据处理：picture存放图片名就行了，无需路径。
        怎么存？ 前端发axios请求
        取出来怎么用？前端发请求，携带图片名参数，获取后端静态资源就可以了。
        */

        // article表操作：
        const { name, picture, intro, category, publish_time } = req.body;
        const sql1 = 'insert into articles values(null,?,?,?,?,?) ';
        const sql5 = 'select name from articles where name=?';
        // category表操作：
        const sql2 = 'select number from category where name=?';
        const sql3 = 'insert into category values(null,?,?)';
        const sql4 = 'update category set number=number+1 where name=?'

        db.query(sql5, name, (err, result) => {
            if (err) return console.log(err.message);
            var data = JSON.parse(JSON.stringify(result)); //去除了烦人的 RowDataPacket 
            if (data.length == 0) {//没有同名文章，正常执行插入操作
                db.query(sql1, [name, picture, intro, category, publish_time], (err, results) => {
                    if (err) return console.log(err.message);
                    // return results;
                    console.log("插入article数据成功！")
                    //文章表插入成功，分类表才能插入成功：
                    db.query(sql2, category, (err, result) => {//查询是否有某个分类名
                        if (err) return console.log(err.message);
                        var data = JSON.parse(JSON.stringify(result)); //去除了烦人的 RowDataPacket 

                        if (data.length == 1) {//如果有，则将该分类的 number+1
                            db.query(sql4, category, (err, result) => {
                                if (err) return console.log(err.message);
                                console.log("更改category数据成功！")
                            });
                        }
                        if (data.length == 0)//如果尚无该分类，则新增该分类，number默认为 1。
                            db.query(sql3, [category, 1], (err, result) => {//执行新增操作
                                if (err) return console.log(err.message);
                                console.log("插入category信息成功");
                            });
                    })
                });
            } else {
                console.log("文章重名，插入失败！")
            }
        });

    },
    getAllarticles(req, res) {
        const sql = 'select * from articles';
        // console.log(_this);
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