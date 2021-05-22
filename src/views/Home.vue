<template>
  <div>
    <loader v-if="loading" />
    <div v-else>
      <div class="gradient-back">
        <v-row class="pa-4" align="center">
          <v-col cols="4" class="py-0">
            <links-tab />
          </v-col>
          <v-col cols="4" class="py-0" align="center">
            <img
              :src="require('../assets/images/logo.png')"
              alt="site visits logo"
              height="50"
            />
          </v-col>
          <v-col cols="4" class="py-0" align="end">
            <a href="#register">Register/Login</a>
          </v-col>
        </v-row>
        <v-container class="white--text text-h5">
          <v-row class="pa-4">
            <v-col cols="8" class="d-flex align-center">
              <div align="center">
                <v-row class="mx-0 mb-2" justify="center"
                  >Want to keep count of the number of times your website is
                  visited?</v-row
                >
                <v-row class="mx-0 mb-8" justify="center"
                  >Well, here's a solution!</v-row
                >
                <v-row class="mx-0 mb-2 text-h4" justify="center"
                  >Keep track of visits of all your websites</v-row
                >
                <v-row class="mx-0 text-h4" justify="center"
                  >At one place!!</v-row
                >
              </div>
            </v-col>
            <v-col cols="4" align="center">
              <img
                :src="require('../assets/images/graphs.png')"
                alt="laptop"
                class="image"
                height="250"
                width="auto"
              />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container>
        <v-row class="mx-0 pb-5 font-30 dark--text" justify="center"
          >Steps</v-row
        >
        <v-row class="mx-0 mt-0 py-5" justify="center">
          <div
            v-for="(item, index) in instructions"
            :key="index"
            class="d-flex"
          >
            <div class="steps-circle">
              <span class="mb-2 text-h5">{{ index + 1 }}</span>
              <span v-html="item"></span>
            </div>
            <v-icon
              v-if="index != instructions.length - 1"
              size="50"
              color="primary"
              >mdi-arrow-right-bold-outline</v-icon
            >
          </div>
        </v-row>
        <v-row class="mx-0 my-5" justify="center" align="baseline">
          <span class="text-h6 font-weight-bold">npm package -</span>
          <a
            :href="npm"
            target="_blank"
            rel="noopener noreferrer"
            class="text-h6 ml-2"
            >{{ npm }}</a
          >
        </v-row>
        <v-row class="mx-0 pt-5 font-30 dark--text" justify="center"
          >Register & Login</v-row
        >
        <v-row id="register" class="pt-8">
          <v-col cols="6" class="d-flex justify-center">
            <register ref="register" @registered="userRegistered" />
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <login ref="login" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
import Loader from "../components/Loader";
import LinksTab from "../components/LinksTab";

export default {
  name: "Home",
  components: { Register, Login, Loader, LinksTab },
  data() {
    return {
      loading: true,
      npm: "https://www.npmjs.com/package/@rockleon/site-visits",
      instructions: [
        `Register or Login to your account`,
        `Create a project. You will get the unique key.`,
        `Import the latest <a href="https://www.npmjs.com/package/@rockleon/site-visits" target="_blank" rel="noopener noreferrer">npm package</a> and set it.`,
        `Login and view visit-count of your projects`,
      ],
    };
  },
  mounted() {
    const token = localStorage.getItem("SITEVISITS_TOKEN");
    if (token && token !== "undefined")
      this.$router.replace({ name: "Projects" });
    else this.loading = false;
  },
  methods: {
    userRegistered(data) {
      this.$refs.login.handleLogin(data);
    },
  },
};
</script>

<style scoped>
.gradient-back {
  padding-bottom: 100px;
}

.image {
  object-fit: contain;
}

.bg-light {
  background-color: var(--v-secondary-lighten2);
}

.font-30 {
  font-size: 30px;
  font-weight: 600;
  text-decoration: underline;
}

.steps-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 160px;
  height: 160px;
  padding: 20px;
  border-radius: 50%;
  color: white;
  background-color: var(--v-primary-base);
}
.steps-circle >>> a {
  color: var(--v-secondary-base) !important;
  text-decoration: underline;
  font-weight: 600;
}

a {
  color: var(--v-secondary-base) !important;
  text-decoration: underline;
  font-weight: 600;
}
</style>