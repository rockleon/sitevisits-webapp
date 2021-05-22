<template>
  <v-card class="pa-8">
    <v-row class="mx-0 text-h5" justify="center"
      >{{ project.id ? "Edit " : "Add " }} Project</v-row
    >
    <v-form ref="projectForm" v-model="valid" class="py-6">
      <v-row class="mx-0">
        <v-text-field
          label="Title *"
          v-model="title"
          :rules="[rules.required]"
          class="mb-2"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0">
        <v-text-field
          label="Description"
          v-model="description"
          class="mb-2"
        ></v-text-field>
      </v-row>
      <v-row class="mx-0">
        <v-text-field
          label="Project URL *"
          v-model="url"
          :rules="[rules.required]"
          class="mb-2"
        ></v-text-field>
      </v-row>
    </v-form>
    <v-row class="mx-0 mt-4" justify="center">
      <v-btn
        color="primary"
        :loading="submitLoading"
        :disabled="submitLoading"
        @click="validateForm"
        >Submit</v-btn
      >
      <v-btn color="error" class="ml-4" @click="cancelProject">Cancel</v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { postProject, patchProject } from "../apis/project";
import eventBus from "../plugins/eventBus";

export default {
  name: "AddProject",
  props: ["project"],
  data() {
    return {
      valid: false,
      title: undefined,
      description: undefined,
      url: undefined,
      submitLoading: false,
      rules: {
        required: (value) => !!value || "required",
        url: (value) =>
          (value &&
            /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/.test(
              value
            )) ||
          "invalid URL format.",
      },
    };
  },
  mounted() {
    if (this.project.id) {
      this.title = this.project.title;
      this.description = this.project.description;
      this.url = this.project.url;
    }
  },
  watch: {
    project: {
      handler(val) {
        this.title = val.title;
        this.description = val.description;
        this.url = val.url;
      },
      deep: true,
    },
  },
  methods: {
    validateForm() {
      this.submitLoading = true;
      this.$refs.projectForm.validate();
      if (!this.valid) this.submitLoading = false;
      else {
        if (this.project.id) this.editProject();
        else this.addProject();
      }
    },
    addProject() {
      const { title, description, url } = this;
      const payload = { title, description, url };
      postProject(payload)
        .then((response) => {
          this.$emit("projectCreated", response);
          const data = {
            color: "success",
            text: "Project Created!!",
          };
          eventBus.$emit("SNACKBAR", data);
          this.$emit("closeDialog");
          this.$refs.projectForm.reset();
        })
        .catch((error) => {
          console.log(error);
          const payload = {
            color: "error",
            text: "Some error occured! Please try again later.",
          };
          eventBus.$emit("SNACKBAR", payload);
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
    editProject() {
      const { title, description, url } = this;
      const payload = { title, description, url };
      patchProject(this.project.id, payload)
        .then((response) => {
          this.$emit("projectEdited", response);
          const data = {
            color: "success",
            text: "Project Edited!!",
          };
          eventBus.$emit("SNACKBAR", data);
          this.$emit("closeDialog");
          this.$refs.projectForm.reset();
        })
        .catch((error) => {
          console.log(error);
          const payload = {
            color: "error",
            text: "Some error occured! Please try again later.",
          };
          eventBus.$emit("SNACKBAR", payload);
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
    cancelProject() {
      this.$refs.projectForm.reset();
      this.$emit("closeDialog");
    },
  },
};
</script>
