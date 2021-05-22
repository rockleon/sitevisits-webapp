import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/axios";
import vuetify from "./plugins/vuetify";
import "@mdi/font/css/materialdesignicons.css";
import VueGtag from "vue-gtag";

Vue.use(
  VueGtag,
  {
    config: { id: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID },
  },
  router
);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
