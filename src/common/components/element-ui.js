// Create VueI18n instance with options
import Vue from "vue";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import VueI18n from "vue-i18n";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import en from "../lang/en";
import zh from "../lang/zh";

Vue.use(VueI18n);
let i18n = new VueI18n({
  locale: "zh", // set locale
  messages: {
    en: {
      ...en,
      ...enLocale
    },
    zh: {
      ...zh,
      ...zhLocale
    }
  }
});

Vue.use(Element, {
  size: "small",
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
});

export { i18n };
