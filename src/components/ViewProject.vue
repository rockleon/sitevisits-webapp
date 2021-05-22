<template>
  <v-card class="pa-8">
    <v-row class="mx-0 pb-4 text-h5" justify="center">{{
      project.title
    }}</v-row>
    <div class="py-2">
      <div class="mx-0 text-subtitle-2 text--secondary">Description:</div>
      <div class="mx-0">
        {{
          project.description && project.description.length
            ? project.description
            : "..."
        }}
      </div>
    </div>
    <div class="mx-0 py-2">
      <div class="mx-0 text-subtitle-2 text--secondary">URL:</div>
      <div class="mx-0">
        <a :href="project.url" target="_blank" rel="noopener noreferrer">{{
          project.url
        }}</a>
      </div>
    </div>
    <div class="mx-0 py-2">
      <div class="mx-0 text-subtitle-2 text--secondary">Key:</div>
      <div class="mx-0">
        {{ project.key }}
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-on="on"
              v-bind="attrs"
              size="20"
              color="#a0a0a0"
              class="ml-2 mb-1"
              @click="copyValue(project.key)"
              >mdi-content-copy</v-icon
            >
          </template>
          <span>Click to copy the key</span>
        </v-tooltip>
      </div>
    </div>
    <div class="mx-0 py-2">
      <div class="mx-0 text-subtitle-2 text--secondary">Created at:</div>
      <div class="mx-0">{{ formatDate(project.created) }}</div>
    </div>
    <div class="mx-0 py-2">
      <div class="mx-0">Visits:</div>
      <div class="mx-0">{{ project.visits }}</div>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import eventBus from "../plugins/eventBus";

export default {
  name: "ViewProject",
  props: ["project"],
  methods: {
    formatDate(date) {
      return moment(date).format("DD MMM yyyy, hh:mm A");
    },
    copyValue(key) {
      navigator.clipboard.writeText(key);
      const data = {
        color: "success",
        text: "Key opied to clipboard!",
      };
      eventBus.$emit("SNACKBAR", data);
    },
  },
};
</script>

<style scoped>
</style>