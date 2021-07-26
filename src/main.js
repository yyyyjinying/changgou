// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Page from "./page";
import router from "./router";
import { i18n } from "common/components/element-ui";
import "common/stylus/index.styl";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  router,
  components: { Page },
  template: "<Page/>"
});
