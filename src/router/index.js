import Vue from "vue";
import Router from "vue-router";
import Page from "@/page";
import Home from "@/page/start.vue";
// import Goods from "@/page/goods/index.vue";
import Category from "@/page/goods/category/index.vue";
import BaseInfo from "@/page/goods/baseInfo";
import Attr from "@/page/goods/attr";
import subRouter from "./subRouter.vue";

Vue.use(Router);
export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "page",
      redirect: "/home",
      component: Page
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/goods",
      name: "goods",
      component: subRouter,
      children: [
        {
          path: "category",
          component: Category
        },
        {
          path: "baseInfo",
          component: BaseInfo
        },
        {
          path: "attr",
          component: Attr
        }
      ]
    }
  ]
});
