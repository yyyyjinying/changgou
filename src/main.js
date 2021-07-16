// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { i18n } from "common/lang/index";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "common/stylus/index.styl";

Vue.use(Element, {
  size: "small",
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  components: { App },
  template: "<App/>"
});
