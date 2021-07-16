// Create VueI18n instance with options
import Vue from "vue";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import VueI18n from "vue-i18n";

const messages = {
  en: {
    message: "hello",
    ...enLocale
  },
  zh: {
    message: "你好",
    ...zhLocale
  }
};
Vue.use(VueI18n);
let i18n = new VueI18n({
  locale: "zh", // set locale
  messages // set locale messages
});

export { i18n };
