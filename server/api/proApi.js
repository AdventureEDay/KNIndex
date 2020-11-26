var models = require("../data.base.conf");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");
var multer = require("multer"); //传输文件
var fs = require("fs");
var convert = require("../convert");
var path = require("path");

// 连接数据库
var connection = mysql.createConnection(models.mysql);
connection.connect();

// 将数据转换为json格式
var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};

// 单元DNA测试显示接口
router.post("/monodnaoriginal", (req, res) => {
  var sql = $sql.property.selectmonooriginal;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM monodna-original ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/monodnastandard", (req, res) => {
  var sql = $sql.property.selectmonostandard;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM monodna-standard ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/didnaoriginal", (req, res) => {
  var sql = $sql.property.selectdidnaoriginal;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM didna-original ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/didnastandard", (req, res) => {
  var sql = $sql.property.selectdidnastandard;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM didna-standard ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/dirnaoriginal", (req, res) => {
  var sql = $sql.property.selectdirnaoriginal;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM dirna-original ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/dirnastandard", (req, res) => {
  var sql = $sql.property.selectdirnastandard;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM dirna-standard ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/tridnaoriginal", (req, res) => {
  var sql = $sql.property.selecttridnaoriginal;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM tridna-original ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

router.post("/tridnastandard", (req, res) => {
  var sql = $sql.property.selecttridnastandard;
  // var params = req.body
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT FROM tridna-standard ERROR]:", err.msg);
    }
    if (result) {
      // console.log(result)
      jsonWrite(res, result);
    }
  });
  // connection.end()
});

// 直接通过sql语句进行搜索查询
router.post("/searchmonoori", (req, res) => {
  var sql = $sql.property.searchmonoori;
  var proname = req.body;
  connection.query(sql, [proname.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM monodna-original ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchmonostan", (req, res) => {
  var sql = $sql.property.searchmonostan;
  var proname = req.body;
  connection.query(sql, [proname.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM monodna-standard ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdidnaori", (req, res) => {
  var sql = $sql.property.searchdidnaori;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM didna-original ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdidnastan", (req, res) => {
  var sql = $sql.property.searchdidnastan;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM didna-standard ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdirnaori", (req, res) => {
  var sql = $sql.property.searchdirnaori;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM dirna-original ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchdirnastan", (req, res) => {
  var sql = $sql.property.searchdirnastan;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM dirna-standard ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchtridnaori", (req, res) => {
  var sql = $sql.property.searchtridnaori;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM tridna-original ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/searchtridnastan", (req, res) => {
  var sql = $sql.property.searchtridnastan;
  var pro = req.body;
  // console.log(pro.propertyName)
  connection.query(sql, [pro.propertyName], (err, result) => {
    if (err) {
      console.log("[SEARCH FROM tridna-standard ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/cluster_reference", (req, res) => {
  // var params = req.body
  var sql = $sql.property.cluster_reference;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[SEARCH FROM cluster_reference ERROR]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/getproperty_mono", (req, res) => {
  var sql = $sql.property.monoproperty;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get propertyname from mono error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/getproperty_didna", (req, res) => {
  var sql = $sql.property.didnaproperty;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get propertyname from didna error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/getproperty_dirna", (req, res) => {
  var sql = $sql.property.dirnaproperty;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get propertyname from dirna error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.post("/getproperty_tri", (req, res) => {
  var sql = $sql.property.triproperty;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get propertyname from tridna error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 参考文献
router.post("/references", (req, res) => {
  var sql = $sql.property.references;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("[get references error]:", err.msg);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

// 接收前端文件
const upload = multer({
  dest: "./upload"
});

router.post("/upload", upload.single("file"), (req, res) => {
  // 判断文件是否存在
  // console.log(typeof(req.body.id));
  let body = JSON.stringify(req.body);
  let para = JSON.parse(body);
  // console.log(JSON.parse(para.tmpProperty));
  if (req.file.length === 0) {
    res.render("error", { message: "the file cannot be empty!" });
    return;
  } else {
    var file = req.file;
    //  对文件更名，这里一次上传一个文件
    var fname = "./upload/" + req.body.id + ".fas";
    fs.renameSync("./upload/" + file.filename, fname);
    let flink = convert.convert(para);
    res.json({
      file: req.file,
      fileLink: flink // 文件名
    });
  }
});

// eslint-disable-next-line no-unused-vars
router.get("/download/*", function(req, res, next) {
  // let name = req.params["0"]; // 是文件名 如 1197892332.csv
  // console.log(req.url); // /download/1197892332.csv
  let fileUrl = req.url;
  let name = fileUrl.substring(fileUrl.lastIndexOf("/") + 1); // 在url中截取文件名
  // console.log(req.originalUrl); // /api/property/download/1197892332.csv
  let tmp = "../results/" + name;
  let pathname = path.join(__dirname, tmp);
  // http://localhost:3000/api/property/download/1775894543.csv
  // http://localhost:3000/api/property/download/1197892332.csv
  let checkFile = fs.existsSync(pathname);
  // console.log(checkFile);
  if (checkFile) {
    let size = fs.statSync(pathname).size;
    let f = fs.createReadStream(pathname);
    res.writeHead(200, {
      "Content-Type": "application/force-download",
      "Content-Disposition": "attachment; filename=" + name,
      "Content-Length": size
    });
    f.pipe(res);
  } else {
    res.set("Content-type", "text/html");
    res.send(
      "https://knindex.pufengdu.org" +
        req.originalUrl +
        " does not exist!" +
        "\n" +
        " Please wait for the conversion process to complete! And make sure your download link is correct. "
    );
    res.end();
  }
});

module.exports = router;
