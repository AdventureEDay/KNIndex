<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        style="margin-right: 20px; height: 55px; width: 55px; vertical-align: middle;"
        src="../assets/datavis.png"
      />
      Visualization
    </el-row>
    <div class="visual">
      <div id="myVisual" style="width: 90%; height: 90%; padding: 10px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      kmers: "",
      values: {}
    };
  },
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
      this.kmers = sessionStorage.getItem("kmers");
      this.values = JSON.parse(sessionStorage.getItem("values"));
    }
    this.toVisual();
  },
  methods: {
    toVisual() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myVisual"));
      let kmers = this.kmers.split(","); // 将以逗号分隔的字符串转换为数组
      let values = this.values;
      //   console.log(values.length);  // undefined
      //   let property = [];
      //   let key = "";
      //   for (key in values) {
      //     property.push(key);
      //   }
      let property = Object.keys(values); // 获得键值数组
      let series = [];
      for (let i = 0; i < property.length; i++) {
        series.push({
          name: property[i],
          type: "line",
          data: values[property[i]],
          markPoint: {
            data: [
              { type: "max", name: "maximum" },
              { type: "min", name: "minimum" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "average" }]
          }
        });
      }
      let option = {
        // 图的标题
        title: {
          text: "Visualization of Results"
          //   subtext: "physicochemical properties"
        },
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
        // 图例
        legend: {
          data: property, // 这里应该是从convert页面传过来的选中的理化特性
          type: "scroll", // 当图例数量过多时，分页显示图例，参考wang
          top: "5%",
          left: "100"
        },
        // 工具栏
        toolbox: {
          show: true,
          feature: {
            // 缩放和缩放还原 但是不知道效果是什么，所以这里就不添加了
            // dataZoom: {
            //   title: {
            //     zoom: "Zoom In Area",
            //     back: "Restore Zoom"
            //   }
            // },
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
              show: true,
              title: "Restore"
            },
            // 保存成图片
            saveAsImage: {
              show: true,
              title: "Save"
            }
          }
        },
        // 横轴
        xAxis: [
          {
            type: "category",
            data: kmers
          }
        ],
        // 纵轴，数据类型为数值
        yAxis: [
          {
            type: "value"
          }
        ],
        // 增加横纵坐标滚动条
        dataZoom: [
          // 为x轴增加滚动条
          {
            show: true,
            xAxisIndex: [0],
            bottom: "2%",
            start: 10,
            end: 90,
            height: 20 // 可以设定高度
          },
          // 为y轴增加滚动条
          {
            show: true,
            yAxisIndex: [0],
            left: "97%",
            start: 0,
            end: 100,
            width: 20, // 可以设定宽度
            showDataShadow: false
          },
          // 可以在图内进行数据的缩放
          {
            type: "inside",
            xAxisIndex: 0,
            start: 10,
            end: 90
          },
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 100
          }
        ],
        series: series
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
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
.visual {
  width: 1000px;
  height: 500px;
  margin: 10px auto;
  background: #ffe4e1;
}
</style>
