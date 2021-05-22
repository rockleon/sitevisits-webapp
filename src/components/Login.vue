<template>
  <v-sheet elevation="3" class="card-container">
    <v-row class="text-h5 mb-4" justify="center">Login!</v-row>
    <v-form ref="loginForm" v-model="valid">
      <v-row class="mx-0">
        <v-text-field
          validate-on-blur
          label="Email"
          v-model="email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0">
        <v-text-field
          validate-on-blur
          label="Password"
          v-model="password"
          :rules="[rules.required, rules.minlength]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          @keypress.enter="validateForm"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-7" justify="center">
        <v-btn
          color="primary"
          :loading="submitLoading"
          :disabled="submitLoading"
          @click="validateForm"
          >Login</v-btn
        >
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script>
import { login } from "../apis/auth";
import eventBus from "../plugins/eventBus";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      email: undefined,
      password: undefined,
      showPassword: false,
      submitLoading: false,
      rules: {
        required: (value) => !!value || "required",
        minlength: (value) =>
          (value && value.length >= 8) ||
          "Password should be atleast 8 characters",
        email: (value) =>
          (value &&
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              value
            )) ||
          "invalid email format.",
      },
    };
  },
  methods: {
    async validateForm() {
      this.submitLoading = true;
      await this.$refs.loginForm.validate();
      if (!this.valid) {
        this.submitLoading = false;
        return;
      }
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.handleLogin(payload);
    },
    handleLogin(payload) {
      login(payload)
        .then((response) => {
          localStorage.setItem("SITEVISITS_TOKEN", response.key);
          const payload = {
            color: "success",
            text: "Logged In Successfully!",
          };
          eventBus.$emit("SNACKBAR", payload);
          setTimeout(() => {
            this.$router.replace({ name: "Projects" });
          }, 1000);
        })
        .catch((error) => {
          const payload = {
            color: "error",
            text:
              error.status === 400
                ? "Invalid Email Id or Password"
                : "Network/Server error. Try again after sometime.",
          };
          eventBus.$emit("SNACKBAR", payload);
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
  },
};
</script>