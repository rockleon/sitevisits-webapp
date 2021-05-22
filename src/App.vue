<template>
  <v-app id="app">
    <v-main>
      <v-container fluid class="px-0">
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app class="text-subtitle-2 d-flex justify-center"
      >Site Visits &copy; 2021</v-footer
    >
    <v-snackbar
      top
      right
      v-model="snackbar"
      :timeout="2000"
      :color="snackColor"
    >
      {{ snackText }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Vue from 'vue'
import eventBus from "./plugins/eventBus";
import VueSmoothScroll from "vue2-smooth-scroll";

Vue.use(VueSmoothScroll, {
  duration: 5000,
  offset: 0,
  updateHistory: true,
});

export default {
  name: "App",
  data() {
    return {
      snackbar: false,
      snackColor: "success",
      snackText: "",
    };
  },
  mounted() {
    eventBus.$on("SNACKBAR", (data) => {
      this.snackColor = data.color;
      this.snackText = data.text;
      this.snackbar = true;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  color: #2c3e50;
  background-color: var(--v-background-base);
}

.card-container {
  padding: 8% 10%;
  width: 100%;
  max-width: 430px;
  height: fit-content;
}

.gradient-back {
  padding-bottom: 40px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./assets/images/wave.png");
}

.v-stepper {
  background: none !important;
  box-shadow: none !important;
}

a {
  text-decoration: none;
}
</style>
