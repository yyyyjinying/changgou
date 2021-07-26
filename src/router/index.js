import Vue from "vue";
import Router from "vue-router";
import Page from "@/page";
import Home from "@/page/start.vue";
import Goods from "@/page/goods";

Vue.use(Router);

export default new Router({
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
      component: Goods
    }
  ]
});
