<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-on="on"
          v-bind="attrs"
          size="36"
          color="secondary"
          class="mr-2"
          @click="openLink(github)"
          >mdi-github</v-icon
        >
      </template>
      <span>View github</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-on="on"
          v-bind="attrs"
          size="56"
          color="secondary"
          @click="openLink(npm)"
          >mdi-npm</v-icon
        >
      </template>
      <span>View npm package</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "LinksTab",
  data() {
    return {
      github: "https://github.com/rockleon/sitevisits-pkg",
      npm: "https://www.npmjs.com/package/@rockleon/site-visits",
    };
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank", ["noopener", "noreferrer"]);
    },
  },
};
</script>