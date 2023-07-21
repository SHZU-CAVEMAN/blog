const db = require('../db.js');

const dao = {
    //
    addUser(req, res) {
        const { account, password} = req.body;
        const sql1 = 'insert into user values(null,?,?) ';
        db.query(sql1, [ account, password], (err, result) => {
            if (err) return console.log(err.message);
            console.log("插入user数据成功！")
        });
    },
    getOneUser(req, res) {
        const {  account,password} = req.body;
        const sql2 = 'select * from user where account = ?';
        const sql3 = 'select * from user';
        db.query(sql3, (err, results) => {
            if (err) return console.log(err.message);
            let data = JSON.parse(JSON.stringify(results)); //去除了烦人的 RowDataPacket
            let flag = 0;
            for (let i = 0; i < data.length; i++) {
                if (data[i].account == account) {
                    flag = 1;
                }
            }
            // if(flag==1) console.log("有用户！");
            // else console.log("无用户！");
            if (flag == 1) {
                db.query(sql2, account, (err, results) => {
                    if (err) return console.log(err.message);
                    var data = JSON.parse(JSON.stringify(results)); //去除了烦人的 RowDataPacket
                    // console.log('hhhh',password);
                    // console.log('aaaa',data[0].password);
                    if (password == data[0].password) {
                        res.send({
                            status: 100,//正确登录
                            data:data,
                        });
                    } else {
                        res.send({
                            status: 200,//密码错误
                        });
                    }

                });
            }else{
                res.send({
                    status: 300,//无此用户
                });
                console.log("无此用户")
            }
        });
        // console.log(_this);

    }
}
module.exports = dao;