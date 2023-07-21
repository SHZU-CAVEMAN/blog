const UserDao = require("../dao/userDao")

module.exports = {
    add: async (req,res) =>{
        await UserDao.addUser(req,res);
    },
    getOneUser: async (req,res) =>{
        await UserDao.getOneUser(req,res);
    },

}