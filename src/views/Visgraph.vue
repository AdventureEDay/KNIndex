<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../assets/datavis.png"
      />
      Visualization
    </el-row>
    <el-row type="flex" class="button" justify="space-between">
      <el-col :span="10">
        <input
          type="button"
          :value="textTip"
          class="change"
          @click="toVisual()"
        />
      </el-col>
      <el-col :span="10">
        <el-row style="margin: 26px auto;">
          <span
            style="color: #606266; font-size:13px; line-height:1.5m; height:1.5em; margin-right: 2px"
            >Relative position of "0" on the x-axis:</span
          >
          <el-select v-model="xstyle" size="mini">
            <el-option label="origin" value="origin"></el-option>
            <el-option label="middle" value="middle"></el-option>
          </el-select>
        </el-row>
      </el-col>
    </el-row>
    <div class="visual" id="vis">
      <div
        id="myVisual"
        style="width: 95%; height: 100%; margin: 0 auto;"
      ></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      seqIdandKmers: {},
      propertyValues: {},
      properties: [], // 选中的理化特性行的数组, 数组每个元素表示数据库中一个理化特性的信息
      seqId: [], // 序列id数组
      // 首先显示平均值曲线
      // graph: "avg",
      // textTip: "Get multiple",
      // 首先显示多条曲线
      graph: "mul",
      textTip: "Get average",
      xstyle: "origin" // 0的位置, 原点或者中间
    };
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    xstyle(newValue, oldValue) {
      if (this.graph == "mul") {
        this.average();
      } else if (this.graph == "avg") {
        this.multiple();
      }
    }
  },
  // 关于生命周期参考：https://blog.csdn.net/weixin_39068791/article/details/81363670
  mounted() {
    // 使用this.$router.push传参时获取参数的方法
    // this.kmers = this.$route.params.kmers;
    // this.values = this.$route.params.values;

    // 使用this.$router.resolve传参时获取参数的方法
    // if (localStorage.getItem("kmers") && localStorage.getItem("values")) {
    //   this.kmers = localStorage.getItem("kmers");
    //   this.values = JSON.parse(localStorage.getItem("values"));
    //   localStorage.clear();
    // }

    if (sessionStorage.getItem("kmers") && sessionStorage.getItem("values")) {
      this.seqIdandKmers = JSON.parse(sessionStorage.getItem("kmers"));
      this.properties = JSON.parse(sessionStorage.getItem("values"));
    }
    // console.log(sessionStorage);
    this.seqId = Object.keys(this.seqIdandKmers); // 获取序列id数组
    this.handleValues(this.properties, this.seqIdandKmers, this.seqId);
    // 如果序列数多于30个，那么单序列曲线只显示前30个
    if (this.seqId.length > 30) {
      this.$alert(
        "The number of sequences exceeds 30. We will provide multiple curves of the first 30 sequences and mean curves of all the sequences.",
        {
          confirmButtonText: "confirm",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
            this.toVisual();
          }
        }
      );
    } else {
      // 序列数小于30, 直接显示
      this.toVisual();
    }
  },
  methods: {
    // 处理从上个页面传递过来的参数
    handleValues(tmpProperty, seqIdandKmers, seqId) {
      let i, j, kmers;
      let tmpNumerical = {};
      // 对每个序列求值
      for (i = 0; i < seqId.length; i++) {
        let visual = {};
        kmers = seqIdandKmers[seqId[i]]; // 对应每个序列的kemrs
        for (j = 0; j < tmpProperty.length; j++) {
          let tmpValue = [];
          for (let p = 0; p < kmers.length; p++) {
            tmpValue.push(tmpProperty[j][kmers[p]]);
          }
          visual[tmpProperty[j].PropertyName] = tmpValue;
        }
        tmpNumerical[seqId[i]] = visual;
      }
      this.propertyValues = tmpNumerical;
    },

    // 按钮转换 单序列图 平均值图
    toVisual() {
      switch (this.graph) {
        case "mul":
          this.multiple();
          this.textTip = "Get average";
          this.graph = "avg";
          break;
        case "avg":
          this.average();
          this.textTip = "Get multiple";
          this.graph = "mul";
          break;
      }
    },

    // 单序列多曲线图
    multiple() {
      let seqIdandKmers = this.seqIdandKmers;
      let propertyValues = this.propertyValues;
      let seqId = this.seqId; // 获取序列id的数组
      // let property = Object.keys(propertyValues[seqId[0]]); // 获得选中的理化特性的数组, 放在这里点击按钮, 不能及时响应
      let height = 350; // 设每张图的高度
      let num = seqId.length > 30 ? 30 : seqId.length;
      // 设置图标显示区域高度,一定要放在初始化实例前面
      document.getElementById("vis").style.height = height * num + 100 + "px";
      // 基于准备好的dom,初始化echarts实例
      let myChart = echarts.init(document.getElementById("myVisual"));
      // 这里使用svg渲染, 没有使用convas渲染,下载的图为矢量图, 但是当图例数量过多时,不显示图例名字
      // let myChart = echarts.init(document.getElementById("myVisual"), null, {
      //   renderer: "svg"
      // });
      myChart.showLoading();
      myChart.resize(); // 这句话一定要有, 否则高度不变
      let property = Object.keys(propertyValues[seqId[0]]); // 获得选中的理化特性的数组
      let title = [];
      let grid = [];
      let xAxis = [];
      let yAxis = [];
      let dataZoom = [];
      let series = [];
      // 横坐标
      let xdata = [];
      if (this.xstyle === "middle") {
        // 生成以0为中心的横坐标数组
        for (let i = 0; i < num; i++) {
          let xtmp = [];
          let tmp = Math.floor(seqIdandKmers[seqId[i]].length / 2);
          for (let x = -tmp; x <= tmp; x++) {
            xtmp.push(x);
          }
          xdata.push(xtmp);
        }
      } else if (this.xstyle === "origin") {
        for (let i = 0; i < num; i++) {
          xdata.push(
            Array.from(new Array(seqIdandKmers[seqId[i]].length).keys())
          );
        }
      }
      // 如果序列数超过30个, 那么选取前30个, 进行曲线显示
      for (let i = 0; i < num; i++) {
        // 设置标题组件
        title.push({
          text: seqId[i],
          top: height * i,
          textStyle: {
            fontWeight: "bold",
            fontSize: 16
          }
        });
        // 设置网格位置
        grid.push({
          left: "7%",
          right: "7%",
          top: height * i + 50,
          height: 270
        });
        // 设置grid中的x轴
        xAxis.push({
          gridIndex: i,
          // data: seqIdandKmers[seqId[i]] // 序列号为seqId[i]的序列的kmers
          data: xdata[i]
        });
        // 设置grid中的y轴
        yAxis.push({
          gridIndex: i,
          type: "value"
        });
        // 设置缩放
        dataZoom.push(
          // 为x轴增加滚动条
          {
            type: "slider",
            show: true,
            xAxisIndex: [i],
            left: "7%",
            top: height * i + 325,
            start: 0,
            end: 100,
            height: 20 // 可以设定高度
          },
          // 为y轴增加滚动条
          {
            type: "slider",
            show: true,
            yAxisIndex: [i],
            left: "94%",
            start: 0,
            end: 100,
            width: 20, // 可以设定宽度
            showDataShadow: false // 纵轴不需要反映数据的走势
          },
          // 可以在图内进行数据的缩放
          {
            type: "inside",
            xAxisIndex: i,
            start: 0,
            end: 100
          },
          {
            type: "inside",
            yAxisIndex: i,
            start: 0,
            end: 100
          }
        );
        // 设置图表类型
        for (let j = 0; j < property.length; j++) {
          series.push({
            type: "line",
            name: property[j],
            xAxisIndex: i,
            yAxisIndex: i,
            symbol: "circle", //图例变成实心圆
            showSymbol: false, // 曲线上不显示数据点
            connectNulls: true, // 连接空数据
            smooth: true, // 折线拐点处做平滑处理
            data: propertyValues[seqId[i]][property[j]],
            markPoint: {
              symbol: "pin",
              symbolSize: 30,
              data: [
                { name: "maximum", type: "max" },
                { name: "minimum", type: "min" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "average" }],
              precision: 3
            }
          });
        }
      }
      // 图表配置项
      let option = {
        // 图的标题
        title: title,
        // 图例组件
        legend: {
          type: "scroll", // 可翻滚翻页的图例。当图例数量较多时可以使用
          left: "100",
          top: "25",
          data: property // 这里应该是从convert页面传过来的选中的理化特性
        },
        grid: grid,
        xAxis: xAxis,
        yAxis: yAxis,
        dataZoom: dataZoom,
        // 鼠标悬停时的提示语
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        // 工具栏
        toolbox: {
          show: true,
          feature: {
            // 数据区域缩放
            dataZoom: {
              title: {
                zoom: "Area Zooming",
                back: "Restore Area Zooming"
              }
            },
            // 数据视图 点击可以显示数据
            dataView: {
              show: true,
              title: "Data View",
              lang: ["Data View", "Close", "Update"],
              readOnly: false
            },
            // 折线图 柱状图可以切换
            magicType: {
              show: true,
              type: ["line", "bar"],
              title: {
                line: "Line Chart",
                bar: "Bar Chart"
              }
            },
            // 还原
            restore: {
              title: "Restore"
            },
            // 保存成图片
            saveAsImage: {
              title: "Save",
              // type: "svg"
              pixelRatio: 3 // 下载图片的分辨率
            }
          }
        },
        series: series,
        color: [
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#6e59ac",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        backgroundColor: "#ffe4e1"
      };
      myChart.setOption(option, true);
      myChart.hideLoading();
      window.onresize = myChart.resize; // 当窗口大小发生变化时,可以使图表自适应大小
    },

    // 画出平均值的曲线 (平均值：所有序列kmers对应位置上的值求平均), seqId: 序列id, property: 选中的理化特性
    average() {
      let seqIdandKmers = this.seqIdandKmers;
      let propertyValues = this.propertyValues;
      let seqId = this.seqId; // 获取序列id的数组
      let height = 370; // 设每张图的高度
      // 设置图标显示区域高度,一定要放在初始化实例前面
      document.getElementById("vis").style.height = height + 50 + "px";
      // 初始化实例
      let avgVisual = echarts.init(document.getElementById("myVisual"));
      avgVisual.showLoading();
      avgVisual.resize(); // 这句话一定要有, 否则高度不变
      let avgValues = {}; // {"理化特性":[平均值数组],"":[], ...}
      let positions = seqIdandKmers[seqId[0]].length; //所有序列的最小kmers数
      for (let i = 1; i < seqId.length; i++) {
        let len = seqIdandKmers[seqId[i]].length;
        if (len <= positions) positions = len;
      }

      let xdata = [];
      if (this.xstyle === "middle") {
        // 生成以0为中心的横坐标数组
        let tmp = Math.floor(positions / 2);
        for (let x = -tmp; x <= tmp; x++) {
          xdata.push(x);
        }
      } else if (this.xstyle === "origin") {
        xdata = Array.from(new Array(positions).keys()); // [0,1,2,3,..,positions-1]
      }

      // console.log(Array.from(new Array(positions).keys()));
      let property = Object.keys(propertyValues[seqId[0]]); // 获得选中的理化特性的数组
      for (let i = 0; i < property.length; i++) {
        let avg = [];
        for (let j = 0; j < positions; j++) {
          let sum = 0;
          for (let m = 0; m < seqId.length; m++) {
            sum += propertyValues[seqId[m]][property[i]][j];
          }
          avg.push(Math.round((sum / seqId.length) * 1000) / 1000); //保留3位小数
          // avg.push(sum / seqId.length); //保留3位小数
        }
        avgValues[property[i]] = avg;
      }
      let series = [];
      // 设置图表类型
      for (let j = 0; j < property.length; j++) {
        series.push({
          type: "line",
          name: property[j],
          connectNulls: true, // 连接空数据
          smooth: true, // 折线拐点处做平滑处理
          symbol: "circle", // 图例是实心的
          showSymbol: false, // 曲线上不显示数据点
          data: avgValues[property[j]]
        });
      }
      let option = {
        title: {
          text: "Average values of all the sequences",
          textStyle: {
            fontWeight: "bold",
            fontSize: 16
          }
        },
        // 图例组件
        legend: {
          type: "scroll", // 可翻滚翻页的图例。当图例数量较多时可以使用
          left: "100",
          top: "25",
          data: property // 这里应该是从convert页面传过来的选中的理化特性
        },
        // 设置网格位置
        grid: {
          left: "7%",
          right: "7%",
          top: 50,
          height: 270
        },
        // 设置grid中的x轴
        xAxis: {
          data: xdata, // 横坐标
          name: "Position relative to sequence",
          nameLocation: "middle",
          nameGap: 30,
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 14
          }
        },
        // 设置grid中的y轴
        yAxis: {
          type: "value"
        },
        // 设置缩放
        dataZoom: [
          // 为x轴增加滚动条
          {
            type: "slider",
            show: true,
            filterMode: "empty",
            xAxisIndex: [0],
            left: "7%",
            top: 325,
            start: 0,
            end: 100,
            height: 20 // 可以设定高度
          },
          // 为y轴增加滚动条
          {
            type: "slider",
            show: true,
            filterMode: "empty", // 不影响其他轴的数据范围
            yAxisIndex: [0],
            left: "94%",
            start: 0,
            end: 100,
            width: 20, // 可以设定宽度
            showDataShadow: false // 纵轴不需要反映数据的走势
          },
          // 可以在图内进行数据的缩放
          {
            type: "inside",
            filterMode: "empty",
            xAxisIndex: 0,
            start: 0,
            end: 100
          },
          {
            type: "inside",
            filterMode: "empty",
            yAxisIndex: 0,
            start: 0,
            end: 100
          }
        ],
        // 鼠标悬停时的提示语
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true
            }
          }
        },
        // 工具栏
        toolbox: {
          show: true,
          feature: {
            // 数据区域缩放
            dataZoom: {
              title: {
                zoom: "Area Zooming",
                back: "Restore Area Zooming"
              }
            },
            // 数据视图 点击可以显示数据
            dataView: {
              show: true,
              title: "Data View",
              lang: ["Data View", "Close", "Update"],
              readOnly: false
            },
            // 折线图 柱状图可以切换
            magicType: {
              show: true,
              type: ["line", "bar"],
              title: {
                line: "Line Chart",
                bar: "Bar Chart"
              }
            },
            // 还原
            restore: {
              title: "Restore"
            },
            // 保存成图片
            saveAsImage: {
              title: "Save",
              // type: "svg"
              pixelRatio: 3 // 下载图片的分辨率
            }
          }
        },
        series: series,
        color: [
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#6e59ac",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        backgroundColor: "#ffe4e1"
      };
      avgVisual.setOption(option, true);
      avgVisual.hideLoading();
      window.onresize = avgVisual.resize;
    }
  }
};
</script>

<style scoped lang="less">
.title {
  text-align: center;
  font-size: 1.5em;
  line-height: 80px;
  height: 80px;
  background: #e6f0ef; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    -45deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    135deg,
    #e6f0ef 45%,
    #b4ede7 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6f0ef', endColorstr='#b4ede7',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
}

.button,
.visual {
  width: 70%;
  margin: 0 auto;
  background: #ffe4e1;
}

.button {
  border-bottom: 2px solid white;
}

.change {
  margin: 20px auto;
  font-size: 16px;
  height: 40px;
  width: 100px;
  border-radius: 5px;
  color: #fff;
  background-color: #e6a23c;
  border: #e6a23c;
  outline: none;
  cursor: pointer; /* 鼠标滑过时, 变为手型*/
}

/deep/ .el-select .el-input__inner:focus {
  border-color: rgb(115, 200, 200);
}

.el-select {
  width: 100px;
}

.el-select-dropdown__item.selected {
  color: rgb(115, 200, 200);
}

.el-select-dropdown__item {
  text-align: center;
  text-indent: 0;
}
</style>
