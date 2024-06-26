<script>
import { api, store } from "../store";
import tt from "@tomtom-international/web-sdk-maps";

import axios from "axios";

export default {
  data() {
    return {
      store,
      api,
      apartment: [],
      address: "",
      email: "",
      body: "",
      errors: {},
      success: false,
      isLoading: true,
      myTimeout: null,
    };
  },

  methods: {
    fetchApartment() {
      const slug = this.$route.params.slug;
      axios.get(api.baseUrl + `apartments/${slug}`).then((res) => {
        this.apartment = res.data.result;
        this.address = res.data.address;
      });
    },

    sendContactForm() {
      let date = new Date();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const fillingData = {
        email: this.email,
        sent:
          date.getFullYear() +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":00",
        body: this.body,
      };
      this.errors = {};

      axios
        .post(`${api.baseUrl}message/${this.apartment.id}`, fillingData)
        .then((response) => {
          this.success = response.data.success;
          if (this.success) {
            this.resetFields();
          } else {
            this.errors = response.data.errors;
          }
        })
        .catch(function () {
          console.warn("Error in call");
        });
    },
    resetFields() {
      this.email = "";
      this.body = "";
    },
    resetSuccess() {
      this.success = false;
    },
    mapGenerator() {
      tt.setProductInfo("BoolBnB", "1.0");
      const map = tt.map({
        key: "J3iuAWIFiXr0BqrC4gh2RHMmzjR7mdUt",
        container: "map-div", // ID del div dove vuoi visualizzare la mappa
        center: [this.apartment.longitude, this.apartment.latitude], // Coordinate del centro della mappa
        zoom: 10, // Livello di zoom iniziale
      });
      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());
      const marker = new tt.Marker({})
        .setLngLat([this.apartment.longitude, this.apartment.latitude])
        .addTo(map);
    },
  },
  components: {},
  created() {
    this.fetchApartment();
  },
  mounted() {
    setTimeout(() => {
      this.mapGenerator();
    }, 1000);
  },
};
</script>

<template>
  <div class="container main-container position-relative py-5">
    <div class="navigation position-absolute">
      <routerLink :to="{ name: 'apartment-search' }"
        ><font-awesome-icon icon="fa-solid fa-reply" class="arrow-navigation"
      /></routerLink>
    </div>
    <div class="header-apartment px-4 mb-4">
      <h1 class="page-title">{{ apartment.title_desc }}</h1>
      <p>
        <strong><font-awesome-icon icon="fa-solid fa-location-dot" /></strong>
        {{ address[0] }}
      </p>
      <h5 class="fs-4 m-1">Proprietario:</h5>
      <p class="fs-5 m-1" v-if="apartment.user">
        {{ apartment.user.name }} {{ apartment.user.surname }}
      </p>
      <button
        type="button"
        class="btn btn-primary m-1"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        data-bs-whatever="@getbootstrap"
        @click="this.resetSuccess()"
      >
        Contatta
      </button>
    </div>

    <div class="apartment-image d-flex px-4">
      <img v-if="apartment.img" :src="apartment.img" alt="..." />
    </div>

    <div class="row g-3 px-4 mt-2 justify-content-center">
      <!-- <div v-for="service in apartment.services" :key="service" class="col-2">
        <div class="service d-flex gap-3">
          <font-awesome-icon class="align-self-center fs-4" :icon="`fa-solid fa-${service.logo}`" />
          <span class="align-self-center">{{ service.name }}</span>
        </div>
      </div> -->

      <div
        v-for="service in apartment.services"
        :key="service"
        class="col-6 col-sm-6 col-md-2 col-lg-2 mb-3"
      >
        <div class="service d-flex gap-3 align-items-center">
          <font-awesome-icon
            class="fs-4"
            :icon="`fa-solid fa-${service.logo}`"
          />
          <span>{{ service.name }}</span>
        </div>
      </div>
    </div>

    <div class="apartment-info p-4 mt-4">
      <p><strong>Stanze:</strong> {{ apartment.n_rooms }}</p>
      <p><strong>Letti:</strong> {{ apartment.n_beds }}</p>
      <p><strong>Bagni:</strong> {{ apartment.n_bathrooms }}</p>
      <p><strong>Mt²:</strong> {{ apartment.square_mts }}</p>
      <p><strong>Ecco dove trovarci:</strong></p>
      <div id="map-div"></div>
    </div>
  </div>
  <div
    id="staticBackdrop"
    data-bs-backdrop="static"
    class="modal fade"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div v-if="!success" class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Nuovo messaggio
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <form>
          <div v-if="!success" class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Mail:</label>
              <input
                type="email"
                class="form-control"
                id="recipient-name"
                v-model="email"
                required
              />
              <div v-if="errors.email">Inserisci un indirizzo email valido</div>
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label"
                >Messaggio:</label
              >
              <textarea
                class="form-control"
                id="message-text"
                v-model="body"
                required
              ></textarea>
              <div v-if="errors.body">Il corpo del messaggio è richiesto</div>
            </div>
          </div>
          <div v-if="!success" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Chiudi
            </button>
            <button
              @click="this.sendContactForm()"
              type="button"
              class="btn btn-primary"
            >
              Invia
            </button>
          </div>
        </form>
        <div v-if="success" class="modal-footer">
          <h4 class="text-success">Messaggio mandato correttamente</h4>
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Grazie
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss";

.container {
  padding-top: 20px;
  color: black;
  .col {
    width: calc(100% / 6);
  }
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
}
.modal-title {
  color: var(--main-color);
  font-weight: bold;
}
.col-form-label {
  color: var(--main-color);
  font-weight: bold;
}

.service {
  background-color: var(--main-color);
  padding: 10px;
  border-radius: 10px;
}

.page-title {
  margin-bottom: 10px;
}

.apartment-image img {
  image-rendering: pixelated;
  object-fit: cover;
  width: 100%;
  height: 400px;
}

.apartment-info {
  // padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  #map-div {
    margin-top: 10px;
    border: 1px solid grey;
    width: 100%;
    height: 400px;
  }
}

.apartment-services {
  padding: 20px;
  color: black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

@media (max-width: 576px) {
  .service {
    padding: 5px;
    font-size: 14px;
  }
}
</style>
