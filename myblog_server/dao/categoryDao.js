const db = require('../db.js');

const dao = {
    getAllcategory(req,res){
        const sql = 'select * from category';
        db.query(sql, (err, results) => {
            if (err) return console.log(err.message);
            var data = JSON.parse(JSON.stringify(results)); //去除了烦人的 RowDataPacket
            res.send({
                status: 0,
                data: data,
            });

        });
    },

}

module.exports  = dao