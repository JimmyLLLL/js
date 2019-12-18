const Koa = require("koa");
const router = require("./router.js");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const KoaBody = require("koa-body");
const app = new Koa();
//const helmet = require('helmet') //设置一些安全的响应头

//app.use(helmet())

app.use(require("koa-static")(__dirname + "/public"));

app.use(
  cors({
    origin: "*"
  })
);

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFileSize: 600 * 1024 * 1024 // 设置上传文件大小最大限制，默认6M
    }
  })
);

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8009);
