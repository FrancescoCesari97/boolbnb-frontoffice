<script>
import { store } from "../store";
import AppSlider from "./AppSlider.vue";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {},

  components: { AppSlider },
};
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
