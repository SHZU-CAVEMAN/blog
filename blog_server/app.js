
const path = require("path");
const express = require("express");
const Static = express.static;
const cors = require("cors");
const multer = require("multer");
const Router = express.Router();
const bodyparser = require("body-parser");

const app = express();

const PORT = 81;
//文件存放目录
const UPLOAD_DIR = path.join(__dirname, "/uploadFiles");



app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
// 为静态资源请求重写url（必须要重定向）
app.use( (req, res, next) => {
  if (req.url.startsWith('/uploadFiles')) {
    //在这里根据文章id找到文章标题，并且将前端传来的文章id 转换为 文章标题
    // console.log(req.url);//截取了前端路由/uploiadFiles后面的部分
    // const url = decodeURI(req.url);
    url = req.url.replace('/uploadFiles/', '');

    req.url = decodeURI(url);//解码后即能识别中文的 url（文章名参数）。
    console.log("成功读取并返回了 "+req.url);
  }
  next();
})
//处理静态资源
app.use(Static(UPLOAD_DIR));


//multer中间件用于解析formdat
const storage = multer.diskStorage({
  //保存路径
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
    //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
  },
  //保存在 destination 中的文件名
  filename: function (req, file, cb) {    
    cb(null, `${file.originalname}`)
  }
})
const upload = multer({ storage: storage })
//为上传markdown文章和上传图片添加路由
Router.post('/upload-single-file', upload.single("file1"), function(req, res) {
  res.send({
    message: `file ${req.file.filename} has saved on the server`,
    // url: `http://localhost:${PORT}/${req.file.originalname}`,
  })
});
app.use(Router);


const Routers_all = require("./route/index");
app.use(Routers_all);



app.listen(PORT, () => {
  console.log(`app starting at   http://127.0.0.1:${PORT}`);
});
