// node 后端服务器
// Express 服务器入口文件
const http = require("http");
const proApi = require("./api/proApi");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const history = require("connect-history-api-fallback");
let server = http.createServer(app);

// 采用设置所有均可访问的方法解决跨域问题
app.all("*", function(req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200);
  // 让options尝试请求快速结束
  else next();
});

//  当路由模式为history时防止空白页
app.use(history());

// 获取req.body参数的处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 后端api路由
app.use("/api/property", proApi);

// 监听端口
server.listen(3000, () => {
  console.log("success listen at port: 3000");
});
