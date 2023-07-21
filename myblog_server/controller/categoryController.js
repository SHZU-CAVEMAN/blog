const CategoryDao = require("../dao/categoryDao");

module.exports = {
    getAll: async (req,res) =>{
        await CategoryDao.getAllcategory(req,res);
  
    }
}