const express = require("express");
const Routers_all = express.Router();


const ArticleRouter = require("./articleRoute");
const CategoryRouter = require("./categoryRoute");
const CommentRouter = require("./commentRoute");
const UserRouter = require("./userRoute");
// const path = require("path");

// const PORT = 3001;
//文件存放目录
// const UPLOAD_DIR = path.join(__dirname, "/uploadFiles");
Routers_all.use(ArticleRouter);
Routers_all.use(CategoryRouter);
Routers_all.use(CommentRouter);
Routers_all.use(UserRouter);

module.exports = Routers_all;

