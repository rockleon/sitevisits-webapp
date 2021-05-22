<template>
  <v-sheet elevation="3" class="card-container">
    <v-row class="text-h5 mb-4" justify="center">Register!</v-row>
    <v-form ref="regForm" v-model="valid">
      <v-row class="mx-0">
        <v-text-field
          label="First Name"
          v-model="firstName"
          :rules="[rules.required]"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0">
        <v-text-field
          label="Last Name"
          v-model="lastName"
          :rules="[rules.required]"
        ></v-text-field>
      </v-row>
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
          v-model="password1"
          :rules="[rules.required, rules.minlength]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0">
        <v-text-field
          validate-on-blur
          label="Re-enter Password"
          type="password"
          v-model="password2"
          :rules="[rules.required, rules.minlength, rules.confirmPassword]"
          @keypress.enter="validateForm"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0 mt-7" justify="center">
        <v-btn
          color="primary"
          :loading="submitLoading"
          :disabled="submitLoading"
          @click="validateForm"
          >Register</v-btn
        >
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script>
import { createUser } from "../apis/auth";
import eventBus from "../plugins/eventBus";

export default {
  name: "Register",
  data() {
    return {
      valid: false,
      firstName: "",
      lastName: "",
      email: undefined,
      password1: undefined,
      password2: undefined,
      showPassword: false,
      submitLoading: false,
      rules: {
        required: (value) => !!value || "required",
        minlength: (value) =>
          (value && value.length >= 8) ||
          "Password should be atleast 8 characters",
        confirmPassword: (value) =>
          (value && value === this.password1) || "Password doesn't match",
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
      await this.$refs.regForm.validate();
      if (!this.valid) {
        this.submitLoading = false;
        return;
      }
      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        username: this.email,
        password: this.password1,
      };
      this.handleRegistration(payload);
    },
    handleRegistration(payload) {
      createUser(payload)
        .then(() => {
          const payload = {
            color: "success",
            text: "Registered Successfully! Logging you in ...",
          };
          eventBus.$emit("SNACKBAR", payload);
          const data = {
            email: this.email,
            password: this.password1,
          };
          setTimeout(() => {
            this.$emit("registered", data);
          }, 1000);
        })
        .catch((error) => {
          const payload = {
            color: "error",
            text: error,
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