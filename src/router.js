import { createRouter, createWebHistory } from "vue-router";

import ApartmentList from "./pages/ApartmentList.vue";
import AppMain from "./components/AppMain.vue";
import AdvancedSearch from "./components/AdvancedSearch.vue";

import Homepage from "./pages/Homepage.vue";
import ApartmentDetail from "./pages/ApartmentDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: Homepage,
    },
    {
      path: "/apartment-search",
      name: "apartment-search",
      component: ApartmentList,
    },
    {
      path: "/apartment-detail/:slug",
      name: "apartment-detail",
      component: ApartmentDetail,
    },
  ],
});
export { router };
