import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browse from "../views/Browse.vue";
import Download from "../views/Download.vue";
import Help from "../views/Help.vue";
import Search from "../views/Search.vue";
import Visualization from "../views/Visualization.vue";
import Visgraph from "../views/Visgraph.vue";
import Batchconvert from "../views/Batch Convert.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*", //没有配置的路径
    redirect: "/home" //默认跳转首页
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/visualization",
    name: "Visualization",
    component: Visualization
  },
  {
    path: "/batch_convert",
    name: "Convert",
    component: Batchconvert
  },
  {
    path: "/download",
    name: "Download",
    component: Download
  },
  {
    path: "/help",
    name: "Help",
    component: Help
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () =>
    //import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  // {
  //   path: "/manual.pdf",
  //   name: "Manual",
  //   component: () => import("../views/Manual.vue")
  // },
  {
    path: "/visualization_graph",
    name: "Visualizationgraph",
    component: Visgraph
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
