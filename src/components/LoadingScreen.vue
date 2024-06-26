<script>
export default {
  data() {
    return {};
  },
};
</script>
<template>
  <div id="loading">
    <img class="img" src="../assets/loading.gif" alt="loading..." width="200" />
  </div>
</template>
<style lang="scss">
#loading {
  position: absolute;
  z-index: 1000;
  background-color: rgb(36, 36, 36);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  // line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
</style>
