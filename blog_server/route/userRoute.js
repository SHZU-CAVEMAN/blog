const express = require("express")
const UserController = require("../controller/userController")

let UserRouter = express.Router();
UserRouter
    .post("/user/register",UserController.add)
    .post("/user/login",UserController.getOneUser);
    
module.exports =  UserRouter;