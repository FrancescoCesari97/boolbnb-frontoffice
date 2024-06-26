<script>
import { api, store } from "../store";
import axios from "axios";

import ApartmentCard from "../components/ApartmentCard.vue";
import AdvancedSearch from "../components/AdvancedSearch.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import {
  faWifi,
  faSquareParking,
  faPersonSwimming,
  faBellConcierge,
  faHotTubPerson,
  faWater,
  faSeedling,
  faElevator,
  faPaw,
  faSnowflake,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      store,
      api,
      apartments: [],
      services: [],
      addresses: [],
      isLoading: true,
      myTimeout: null,
      currentServices: [],
    };
  },

  props: [],
  components: { ApartmentCard, AdvancedSearch, LoadingScreen },

  methods: {
    // clearStore() {
    //   (store.addressSearch = ""),
    //     (store.roomsSearch = 1),
    //     (store.bedsSearch = 1),
    //     (store.bathroomsSearch = 1),
    //     (store.rangeSearch = 20);
    // },

    fetchApartmentsFirst() {
      axios
        .get(api.baseUrl + "apartments", {
          params: {
            beds: store.bedsSearch ?? 1,
            rooms: store.roomsSearch ?? 1,
            services: store.servicesSearch ?? [],
            address: store.addressSearch ?? "",
            range: store.rangeSearch ?? 20,
          },
        })
        .then((response) => {
          this.apartments = response.data.result;
          this.addresses = response.data.addresses;
          if (this.apartments.length > 0) {
            this.isLoading = false;
          } else {
            this.isLoading = true;
          }
        });
    },

    fetchApartments(
      searchText,
      searchRange,
      searchBeds,
      searchRooms,
      searchServices
    ) {
      store.bedsSearch = searchBeds;
      store.roomsSearch = searchRooms;
      store.addressSearch = searchText;
      store.rangeSearch = searchRange;
      axios
        .get(api.baseUrl + "apartments", {
          params: {
            beds: searchBeds ?? 1,
            rooms: searchRooms ?? 1,
            services: searchServices ?? [],
            address: searchText ?? "",
            range: searchRange ?? 20,
          },
        })
        .then((response) => {
          this.apartments = response.data.result;
          // this.currentServices = searchServices;
          // console.log(this.currentServices);
          this.addresses = response.data.addresses;
        });
    },
  },
  created() {
    // console.log(store.addressSearch);
    this.fetchApartmentsFirst();
  },

  // mounted() {
  //   this.myTimeout = setTimeout(() => {
  //     this.isLoading = false;
  //   }, 6000);
  // },

  unmounted() {
    // this.clearStore();
    clearTimeout(this.myTimeout);
  },
};
</script>

<template>
  <!-- <h1></h1> -->
  <loading-screen v-if="isLoading" />
  <div class="container main-container position-relative py-5">
    <div class="navigation position-absolute">
      <routerLink :to="{ name: 'homepage' }"
        ><font-awesome-icon icon="fa-solid fa-reply" class="arrow-navigation"
      /></routerLink>
    </div>
    <advanced-search @search="fetchApartments" />
    <h2 class="page-title mb-4">Lista Appartamenti</h2>
    <div v-if="apartments.length != 0" class="row g-3">
      <div v-for="(apartment, index) in apartments" class="col-4 col-full">
        <ApartmentCard
          :key="apartment.id"
          :apartment="apartment"
          :address="addresses[index]"
        />
      </div>
    </div>
    <div class="text-center mt-5 fs-4" v-else>Nessun risultato trovato</div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/_variables.scss" as *;
.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  top: 50px;
  left: -60px;
  border-radius: 50%;
  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
    transition: 0.5s;
  }
  .arrow-navigation {
    width: 100%;
    color: var(--main-color);
    font-size: 35px;
  }
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
}

.h-all {
  height: 500px;
}

.service {
  background-color: var(--main-color);
  padding: 10px;
  border-radius: 10px;
  color: #333;
}

.clickable {
  cursor: pointer;
}

@media (max-width: 576px) {
  .col-full {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>
