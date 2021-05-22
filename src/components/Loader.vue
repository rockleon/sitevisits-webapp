<template>
  <div class="loader-screen">
    <v-progress-circular
      indeterminate
      color="primary"
      size="45"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
}
</style>