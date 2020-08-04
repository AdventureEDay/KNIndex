// sql语句
var sqlMap = {
  property: {
    // 显示数据
    selectmonooriginal: "select * from `monodna-original`",
    selectmonostandard: "select * from `monodna-standard`",
    selectdidnaoriginal: "select * from `didna-original`",
    selectdidnastandard: "select * from `didna-standard`",
    selectdirnaoriginal: "select * from `dirna-original`",
    selectdirnastandard: "select * from `dirna-standard`",
    selecttridnaoriginal: "select * from `tridna-original`",
    selecttridnastandard: "select * from `tridna-standard`",

    // 搜索数据
    searchmonoori:
      'select * from `monodna-original` where PropertyName like "%"?"%"',
    searchmonostan:
      'select * from `monodna-standard` where PropertyName like "%"?"%"',
    searchdidnaori:
      'select * from `didna-original` where PropertyName like "%"?"%"',
    searchdidnastan:
      'select * from `didna-standard` where PropertyName like "%"?"%"',
    searchdirnaori:
      'select * from `dirna-original` where PropertyName like "%"?"%"',
    searchdirnastan:
      'select * from `dirna-standard` where PropertyName like "%"?"%"',
    searchtridnaori:
      'select * from `tridna-original` where PropertyName like "%"?"%"',
    searchtridnastan:
      'select * from `tridna-standard` where PropertyName like "%"?"%"',

    // 按参考文献分类的表
    cluster_reference: "select * from cluster_refer",

    //  按元分类以及用于模糊查询的输入建议
    monoproperty:
      "select PropertyName from `monodna-original` order by PropertyName",
    didnaproperty:
      "select PropertyName from `didna-original` order by PropertyName",
    dirnaproperty:
      "select PropertyName from `dirna-original` order by PropertyName",
    triproperty:
      "select distinct PropertyName from `tridna-original` order by PropertyName",

    // 查询参考文献
    references: "select * from pubmedid order by ReferID"
  }
};

module.exports = sqlMap;
