<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {
      isLoading: true,
      myTimeout: null,
    };
  },

  props: {},
  methods: {},
  components: { AppHeader, AppFooter, AppMain },
};
</script>

<template>
  <div class="page-container">
    <app-header />

    <app-main></app-main>

    <app-footer />
  </div>
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
