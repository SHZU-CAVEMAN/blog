const express = require("express");
const CommentController = require("../controller/commentController");

let commentRouter = express.Router();
commentRouter
    .post("/comment/add",CommentController.addComment)
    .get("/comment/getall",CommentController.getComments);

module.exports = commentRouter;