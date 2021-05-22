import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#004E92",
        secondary: "#8ED40B",
        background: "#FAFAFA",
        dark: "#141E30",
        // card1: "F5F5F6",
        // card2: "FCFCFC",
        // card3: "FAFAFA",
        text: "000000",
        error: "#FD322B",
        info: "#3AA0F3",
        success: "#4ACB41",
        warning: "#FF9500",
      },
    },
  },
});
