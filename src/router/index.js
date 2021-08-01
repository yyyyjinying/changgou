import Vue from "vue";
import Router from "vue-router";
import Page from "@/page";
import Home from "@/page/start.vue";
import AddGoods from "@/page/goods/category/index.vue";
import ListGoods from "@/page/goods/list/index.vue";
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
          path: "add",
          component: AddGoods
        },
        {
          path: "list",
          component: ListGoods
        }
      ]
    }
  ]
});
