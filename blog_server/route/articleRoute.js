const express = require("express")
const ArticleController = require("../controller/articleController")

let ArticleRouter = express.Router();
ArticleRouter
    .post("/article/add",ArticleController.add)
    .get("/article/getall",ArticleController.getAll);

module.exports =  ArticleRouter;