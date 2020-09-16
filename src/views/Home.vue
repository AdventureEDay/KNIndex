<template>
  <div>
    <el-row class="title" style="color: #606060;">
      <img
        src="../assets/home.png"
        style="height: 45px; width: auto;  vertical-align: middle; margin-right: 20px;"
      />
      Welcome to KNIndex
    </el-row>
    <el-row class="content" type="flex" justify="space-between">
      <el-col :span="10">
        <i
          style="font-size: 20px; margin-right: 10px; color: #606060;"
          class="el-icon-info"
        >
          Introduction of KNIndex</i
        >
        <p>
          <b>KNIndex</b> is the abbreviation of <b>K</b>-<b>N</b>ucleotides
          <b>Index</b> database. The database deposits the original and
          standardized values of the physicochemical properties for
          <i>k</i>-tuple nucleotides (<i>k</i> = 1, 2, 3).
        </p>
        <p>
          The
          <router-link to="/home"
            ><b><i>Home</i></b></router-link
          >
          page mainly describes the organization of the KNIndex server.
        </p>
        <p>
          The
          <router-link to="/browse"
            ><b><i>Browse</i></b></router-link
          >
          page categories all physicochemical property values in a hierarchical
          structure. The users can browse all data on this page.
        </p>
        <p>
          The
          <router-link to="/search"
            ><b><i>Search</i></b></router-link
          >
          page provides the ability to search by the name of physicochemical
          properties. If a user wants to find a property without knowing the
          exact name of it, the user may use the fuzzy search function, which
          allows the user to use '*' or '%' as wildcards in queries. The search
          box has auto-complete abilities. A dropdown menu will be displayed if
          the content of the search box matches the first few letters of the
          names of physicochemical properties. The values of physicochemical
          properties will be shown in tables, with links to the original
          references of each physicochemical property.
        </p>
        <p>
          The
          <router-link to="/visualization"
            ><b><i>Visualization</i></b></router-link
          >
          page implements the function of converting DNA/RNA sequences to
          numerical series according to selected physicochemical properties.
        </p>
        <p>
          The
          <router-link to="/batch_convert"
            ><b><i>Convert</i></b></router-link
          >
          page integrates a tool for converting a set of DNA/RNA sequences into
          series of numerical physicochemical properties.
        </p>
        <p>
          The
          <router-link to="/download"
            ><b><i>Download</i></b></router-link
          >
          page list all static links to the data packages in the KNIndex
          database.
        </p>
        <p>
          The
          <router-link to="/help"
            ><b><i>Help</i></b></router-link
          >
          page provides step-by-step instructions on how to use the KNIndex
          database.
        </p>
        <p>
          Currently, <b>182</b> physicochemical properties are deposited in the
          KNIndex database.
        </p>
        <p>
          Last update on: Sep. 15th, 2020.
        </p>
      </el-col>
      <!-- 2020.09.07修改了图片和说明的相对位置 -->
      <el-col :span="10">
        <!-- <div id="myHeatmap" style="width: 600px;height:600px;"></div> -->
        <img
          alt="basic properties"
          src="../assets/property.jpg"
          style="max-width: 85%; height: auto; margin: 40px;"
        />
        <div style="max-width: 100%;">
          <span style="font-size: 12px; float:right;"
            >(Britton et al., <i>J Chem Phys</i>. 2009)</span
          >
        </div>
        <!-- <div
          id="myChart"
          style="width: auto; height:400px; margin:60px auto;"
        ></div> -->
        <!-- <div style="width: 600px; height:400px;">
          <a v-for="image in statistics" :key="image.href" :href="image.href"
            ><img
              alt="Quantitative statistics of physicochemical properties"
              :src="require('../assets/statistics/' + image.filesrc)"
              style="width: auto; height:400px;"
            />
          </a>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
// export default {
//   mounted() {
//     // 可视化柱状图
//     this.toVisual();
//   },
//   methods: {
//     toVisual() {
//       // 基于准备好的dom，初始化echarts实例
//       let myChart = echarts.init(document.getElementById("myChart"));
//       // 指定图表的配置项和数据
//       let option = {
//         title: {
//           text: "Quantitative statistics of physicochemical properties",
//           x: "center",
//           y: "bottom"
//         },
//         tooltip: {},
//         xAxis: {
//           data: [
//             "Mononucleotide",
//             "Dinucleotide (DNA)",
//             "Dinucleotide (RNA)",
//             "Trinucleotide"
//           ],
//           // 坐标倾斜显示
//           axisLabel: {
//             interval: 0,
//             rotate: "30"
//           }
//         },
//         grid: {
//           //直角坐标系内绘图网格
//           // show: true, //是否显示直角坐标系网格。[ default: false ]
//           // left: "20%", //grid 组件离容器左侧的距离。
//           // right: "30px",
//           // borderColor: "#c45455", //网格的边框颜色
//           bottom: "30%" //
//         },
//         toolbox: {
//           feature: {
//             saveAsImage: {
//               pixelRatio: 3
//             }
//           }
//         },
//         yAxis: {},
//         series: [
//           {
//             type: "bar",
//             data: [1, 147, 22, 12],
//             label: {
//               show: true,
//               position: "inside"
//             }
//           }
//         ]
//       };
//       myChart.setOption(option);
//     }
//   }
// };
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
.content {
  padding: 20px 10%;
  margin: 0 auto;
  text-align: left;
}
.content p {
  /* 行间距 */
  line-height: 1.5em;
  /* 首行缩进 */
  /* text-indent: 2em; */
  /* 两端对齐 */
  text-align: justify;
}
.content p a {
  color: #202122;
}
</style>
