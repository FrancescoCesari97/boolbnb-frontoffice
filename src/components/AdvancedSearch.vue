<script>
import { api, store } from "../store";
import axios from "axios";

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
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      store,
      api,
      allServices: [],
      showBadge: false,
      searchText: store.addressSearch ?? "",
      searchBeds: store.bedsSearch ?? 1,
      searchRooms: store.roomsSearch ?? 1,
      searchRange: store.rangeSearch ?? 20,
      searchServices: store.servicesSearch ?? [],
      serviceIcons: {
        WiFi: faWifi,
        "Posto Macchina": faSquareParking,
        Piscina: faPersonSwimming,
        Portineria: faBellConcierge,
        Sauna: faHotTubPerson,
        "Vista Mare": faWater,
        Giardino: faSeedling,
        Ascensore: faElevator,
        "Animali ammessi": faPaw,
        "Aria Condizionata": faSnowflake,
        Location: faLocationDot,
      },
    };
  },

  props: [],
  emits: ["search"],
  created() {
    axios.get(api.baseUrl + "apartment-service").then((response) => {
      this.allServices = response.data.result;
    });
    if (store.servicesSearch.length > 0) {
      this.showBadge = true;
    }
  },
  mounted() {
    this.searchbar();
  },
  methods: {
    searchbar() {
      let options = {
        searchOptions: {
          key: "J3iuAWIFiXr0BqrC4gh2RHMmzjR7mdUt",

          language: "it-IT",
          limit: 5,
        },
        autocompleteOptions: {
          key: "J3iuAWIFiXr0BqrC4gh2RHMmzjR7mdUt",

          language: "it-IT",
        },
      };
      let ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
      let searchBoxHTML = ttSearchBox.getSearchBoxHTML();
      document.getElementById("searchbox").append(searchBoxHTML);
      const inputBox = document.querySelector(".tt-search-box-input");
      inputBox.setAttribute("value", store.addressSearch ?? "");
      inputBox.addEventListener("input", (event) => {
        this.searchText = event.target.value;
        // console.log(event);
      });
    },
    submitSearch() {
      if (this.search.rooms !== null && this.search.rooms <= 0) {
        alert("Il numero di camere non può essere negativo");
        return;
      }
      if (this.search.beds !== null && this.search.beds <= 0) {
        alert("Il numero di letti non può essere negativo");
        return;
      }
    },
    handleServiceClick(id) {
      if (!this.searchServices.includes(id)) {
        this.searchServices.push(id);
      } else {
        this.searchServices = this.searchServices.filter(
          (elemento) => elemento !== id
        );
        store.servicesSearch = store.servicesSearch.filter(
          (elemento) => elemento !== id
        );
      }
    },

    deleteService(id) {
      if (this.searchServices.length == 1) {
        return (this.searchServices = []);
      } else {
        if (this.searchServices.includes(id)) {
          console.log(this.searchServices.splice(id, 1));
          return this.searchServices.splice(id, 1);
        }
      }
    },

    getServiceIcon(serviceName) {
      return this.serviceIcons[serviceName] || null;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="input-group mb-4 d-flex">
      <!-- <input
        type="text"
        :placeholder="store.addressSearch"
        v-model="searchText"
        class="form-control"
        @keyup.enter="$emit('search', searchText)"
      /> -->
      <div id="searchbox"></div>
      <div>
        <button
          @click="showBadge = false"
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
        >
          Filtri avanzati
        </button>
        <button class="btn btn-secondary" @click="$emit('search', searchText)">
          Cerca
        </button>
      </div>
    </div>
    <div v-if="showBadge == true" class="row row-services">
      <div
        v-for="(service, index) in searchServices"
        class="col-6 col-sm-6 mb-3 col-md-2 col-lg-2"
      >
        <div class="service d-flex mb-3">
          <font-awesome-icon
            class="fs-4"
            :icon="`fa-solid ${store.services[service - 1].logo}`"
          />
          <strong>{{ store.services[service - 1].name }}</strong>
          <!-- <font-awesome-icon
            @click="$emit('search', searchText, deleteService(service.id))"
            class="align-self-center clickable"
            icon="fa-solid fa-x"
          /> -->
        </div>
      </div>
      <div class="col-6 col-sm-6 mb-3 col-md-2 col-lg-2">
        <div class="service d-flex">
          <font-awesome-icon class="fs-4" icon="fa-solid fa-bed" />
          <strong>N. Letti: </strong>
          <span>{{ store.bedsSearch }}</span>
        </div>
      </div>
      <div class="col-6 col-sm-6 mb-3 col-md-2 col-lg-2">
        <div class="service d-flex">
          <font-awesome-icon
            class="fs-4"
            icon="fa-solid fa-person-shelter"
          /><strong>N. Stanze: </strong>
          <span>
            {{ store.roomsSearch }}
          </span>
        </div>
      </div>
      <div class="col-6 col-sm-6 mb-3 col-md-2 col-lg-2">
        <div class="service d-flex">
          <font-awesome-icon
            class="fs-4"
            icon="fa-solid fa-arrows-left-right-to-line"
          />
          <strong>Raggio: </strong>
          <span> {{ store.rangeSearch }} km </span>
        </div>
      </div>
    </div>
  </div>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title fs-3" id="offcanvasExampleLabel">
        <strong> Filtri Avanzati </strong>
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body p-4">
      <div class="fw-bold fs-4">Cerca l'alloggio che fa per te!</div>
      <div class="mt-3 fs-5">
        <label for="range" class="form-label">Raggio di ricerca</label>
        <div class="input-range d-flex gap-1 mb-2">
          <input
            v-model="searchRange"
            type="range"
            class="form-range m-0"
            min="1"
            max="100"
            step="1"
            id="range"
          />

          <!-- *************** Numero dinamico input range ***************** -->
          <!-- <input
            class="input-number"
            type="number"
            for="range"
            min="1"
            max="100"
            :value="searchRange"
          /> -->
          <div class="range-value">{{ searchRange }} Km</div>
        </div>
        <div class="row my-3">
          <div class="col-6">
            <label for="beds" class="form-label me-3">N° Letti</label>
            <input
              class="w-75"
              v-model="searchBeds"
              type="number"
              min="1"
              max="20"
              id="beds"
              name="beds"
            />
          </div>
          <div class="col-6">
            <label for="rooms" class="form-label me-3">N° Stanze</label>
            <input
              class="w-75"
              v-model="searchRooms"
              type="number"
              min="1"
              max="50"
              id="rooms"
              name="rooms"
            />
          </div>
          <label for="" class="fw-bold my-3"
            >Seleziona i servizi che desideri:</label
          >

          <div
            class="col-6 d-flex align-items-center"
            v-for="service in allServices"
            :key="service.id"
          >
            <div v-show="this.allServices.length > 0" class="form-check d-flex">
              <div class="align-self-center">
                <input
                  @click="handleServiceClick(service.id)"
                  class="form-check-input"
                  type="checkbox"
                  :id="service.id"
                  :value="service.id"
                  :checked="searchServices.includes(service.id) ?? false"
                />
                <font-awesome-icon
                  v-if="getServiceIcon(service.name)"
                  :icon="getServiceIcon(service.name)"
                  class="me-2"
                />
              </div>

              <label class="form-check-label" :for="service.id">
                {{ service.name }}
              </label>
            </div>
          </div>
        </div>
        <button
          @click="
            $emit(
              'search',
              searchText,
              searchRange,
              searchBeds,
              searchRooms,
              searchServices
            ),
              (showBadge = true)
          "
          class="btn btn-modal"
          data-bs-dismiss="offcanvas"
        >
          Applica Filtri
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/partials/variables";

.container {
  justify-content: center;

  .form-check-label {
    display: flex;
    align-items: center;

    .fa-icon {
      margin-right: 8px;
    }
  }

  .input-group {
    display: flex;
    justify-content: space-around;
    align-items: end;
  }

  .btn-primary {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .btn-secondary {
    font-size: 20px;
    padding: 7px 18px;
    background-color: var(--gray);
    border: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: 0.5s;
    }
  }

  .btn-modal {
    font-size: 18px;
    padding: 7px 18px;
    margin: 10px 0;
    color: var(--white);
    background-color: var(--main-color);
    border: none;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
      transition: 0.5s;
    }
  }

  #searchbox {
    width: 70%;

    .tt-search-box {
      width: 100%;
    }
  }

  .offcanvas {
    width: 500px;
    color: var(--main-color);
    background-color: #f0f8ff;

    .offcanvas-title {
      color: var(--main-color);
    }

    .range-value {
      width: 90px;
      text-align: end;
      line-height: 20px;
    }

    input[type="range"] {
      height: 25px;
      -webkit-appearance: none;
      margin: 10px 0;
      width: 100%;
    }

    input[type="range"]:focus {
      outline: none;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 12px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 6px #918ec0;
      background: #f7f7f7;
      border-radius: 6px;
      border: 0px solid #918ec0;
    }

    input[type="range"]::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000031;
      border: 0px solid #00001e;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #918ec0;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -3px;
    }

    input[type="range"]:focus::-webkit-slider-runnable-track {
      background: #f7f7f7;
    }

    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 12px;
      cursor: pointer;
      animate: 0.2s;
      box-shadow: 0px 0px 6px #918ec0;
      background: #f7f7f7;
      border-radius: 6px;
      border: 0px solid #918ec0;
    }

    input[type="range"]::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000031;
      border: 0px solid #00001e;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #918ec0;
      cursor: pointer;
    }

    input[type="range"]::-ms-track {
      width: 100%;
      height: 12px;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    input[type="range"]::-ms-fill-lower {
      background: #f7f7f7;
      border: 0px solid #918ec0;
      border-radius: 12px;
      box-shadow: 0px 0px 6px #918ec0;
    }

    input[type="range"]::-ms-fill-upper {
      background: #f7f7f7;
      border: 0px solid #918ec0;
      border-radius: 12px;
      box-shadow: 0px 0px 6px #918ec0;
    }

    input[type="range"]::-ms-thumb {
      margin-top: 1px;
      box-shadow: 1px 1px 1px #000031;
      border: 0px solid #00001e;
      height: 18px;
      width: 18px;
      border-radius: 25px;
      background: #918ec0;
      cursor: pointer;
    }

    input[type="range"]:focus::-ms-fill-lower {
      background: #f7f7f7;
    }

    input[type="range"]:focus::-ms-fill-upper {
      background: #f7f7f7;
    }

    .input-number {
      width: 60px;
    }

    .form-check-input {
      border-color: #918ec0;
    }
  }
}

.service {
  background-color: var(--main-color);
  padding: 10px;
  border-radius: 10px;
  color: #333;
  gap: 15px;
}

.clickable {
  cursor: pointer;
}

@media (max-width: 576px) {
  .input-group {
    gap: 20px;
  }

  #offcanvasExample {
    width: 100%;
  }

  .row-services {
    display: none;
  }
  // .service {
  //   justify-content: center;
  //   strong {
  //     display: none;
  //   }
  // }
}
</style>
