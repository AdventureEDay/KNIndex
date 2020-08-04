// 要同步读写文件才能保证接连读取文件，不出现死循环的现象
// 返回值为结果的下载链接
function convert(para) {
  myReadFile(para);
  let fname = para.id + ".csv";
  return fname;
}

// 读取文件，获得序列注释和序列的对象数组[{notation:"",seq:""},{},{},...]
function myReadFile(para) {
  let fs = require("fs");
  let sequences = [];
  let fname = "/upload/" + para.id + ".fas";
  // let readStream = fs.createReadStream(__dirname + fname);
  let remaining = fs.readFileSync(__dirname + fname);
  remaining.toString();
  // let remaining = "";
  // let k = 0;
  // readStream.on("data", data => {
  // console.log(data);
  // remaining += data;
  remaining += "\n\r"; // 为了防止有的文件最后有换行有的没有，所以统一加上换行符
  remaining = remaining.replace(/\r/g, ""); // /g全局将\r去除
  let index = remaining.indexOf("\n");
  let line = remaining.substring(0, index);
  remaining = remaining.substring(index + 1);
  // console.log(index);
  // 不是文件尾
  while (index > -1) {
    // k++;
    // console.log(k);
    let item = { notation: "", seq: "" };
    // let line = remaining.substring(0, index);
    // console.log(line);
    // remaining = remaining.substring(index + 1);
    // 如果这一行开头是">", 继续向下读
    let index1 = line.indexOf(">");
    if (index1 == 0) {
      // let notation = line.substring(1).replace("\r", "");
      let notation = line.substring(1);
      item.notation = notation; // 记录注释
      // 向下读取序列
      index = remaining.indexOf("\n");
      line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      index1 = line.indexOf(">");
      let seq = "";
      while (index > -1 && index1 !== 0) {
        // seq += line.replace("\r", ""); // 注意换行符是\n\r
        seq += line; // 注意换行符是\n\r
        index = remaining.indexOf("\n");
        line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        index1 = line.indexOf(">");
      }
      item.seq = seq;
      sequences.push(item);
      // console.log(item);
    }
    index = remaining.indexOf("\n");
    // console.log(remaining.length);
  }
  // });

  // readStream.on("end", function() {
  bashConvert(para, sequences);
  // });
}

function bashConvert(para, sequences) {
  // console.log(sequences);
  let kmer = para.kmer;
  let value = para.value;
  let property = JSON.parse(para.tmpProperty);

  // [{notation:"", numerical:"", propertyname:"", kmer:"", value:""},{},{},...]
  // 上面格式不用了，改成数组的每个元素是所有的值
  let numericalSeq = [];
  let i = 0;
  let j = 0;
  for (i = 0; i < sequences.length; i++) {
    let notation = sequences[i].notation;
    let kmers = toKmers(sequences[i].seq, kmer); // 这样是数组
    // .join(", "); // 数组转换为以逗号加空格分隔的字符串
    for (j = 0; j < property.length; j++) {
      let numerical = toNumerical(property[j], kmers);
      let item =
        numerical.join(", ") +
        ", # " +
        notation +
        ", " +
        property[j].PropertyName +
        ", " +
        value +
        " values";
      numericalSeq.push(item);
    }
  }
  myWriteFile(para.id, numericalSeq);
}

// 序列按照kmer进行拆分成kmers
function toKmers(inputSequence, kmer) {
  // 输入的序列按照kmer进行拆分成kmers---------------------------------
  let m = 0;
  let k = 1;
  let kmers = []; // 拆分的kmers
  if (kmer == "di") k = 2;
  else if (kmer == "tri") k = 3;
  // inputSequence 为输入的核酸序列
  for (m = 0; m <= inputSequence.length - k; m++) {
    let mer = inputSequence.substring(m, m + k);
    kmers.push(mer);
  }
  return kmers;
  // 输入序列拆分结束---------------------------------------------------
}

// 将kmers转成对应的数值,返回的是数组
function toNumerical(property, kmers) {
  // 输入为一个理化特性的一行信息，和一个序列的kmers数组
  let tmpValue = [];
  for (let p = 0; p < kmers.length; p++) {
    tmpValue.push(property[kmers[p]]);
  }
  return tmpValue;
}

// 将结果写入文件 格式： 值序列 # 注释 理化特性 kmer 值类型
function myWriteFile(id, numericalSeq) {
  // console.log(numericalSeq);
  // console.log(numericalSeq.length);
  // 首行写上kmers，不可行，因为是多个序列，kmers不同
  let fs = require("fs");
  let fname = "/results/" + id + ".csv";
  // let writeStream = fs.createWriteStream(__dirname + fname);

  let pathName = __dirname + fname;

  // 一定得是追加{ flag: "a" }
  numericalSeq.forEach(value =>
    fs.writeFileSync(__dirname + fname, `${value}\n`, { flag: "a" }, function(
      err
    ) {
      if (err) {
        throw err;
      }
    })
  );
  console.log(`wrote all the array data to file ${pathName}`);
  // writeStream.on("finish", () => {
  //   console.log(`wrote all the array data to file ${pathName}`);
  //   console.log(pathName);
  // });
  // writeStream.on("error", err => {
  //   console.error(`There is an error writing the file ${pathName} => ${err}`);
  // });

  // writeStream.end();
}
exports.convert = convert;
