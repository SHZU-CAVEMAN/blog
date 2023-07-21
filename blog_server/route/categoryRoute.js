const express = require("express")
const CategoryController = require("../controller/categoryController")

let categoryRouter = express.Router();
categoryRouter
    .get("/category/getall",CategoryController.getAll);

module.exports =  categoryRouter;