<script>
import { api } from "../store";
import axios from "axios";

export default {
  // props:{ApartmentDetail},

  data() {
    return {
      api,
      images: [],
      addresses: [],
      sponsoredApartments: [],
      activeImg: 0,
      autoplay: false,
    };
  },

  methods: {
    nextSlide() {
      if (this.activeImg >= this.images.length - 1) {
        this.activeImg = 0;
      } else {
        this.activeImg++;
      }
    },

    prevSlide() {
      if (this.activeImg <= 0) {
        this.activeImg = this.images.length - 1;
      } else {
        this.activeImg--;
      }
    },

    setAutoPlay() {
      this.autoplay = setInterval(() => {
        this.nextSlide();
      }, 2000);
    },

    stopAutoPlay() {
      clearInterval(this.autoplay);
    },

    fetchApartments() {
      axios.get(`${api.baseUrl}apartment-sponsor`).then((response) => {
        if (response.data.result && Array.isArray(response.data.result)) {
          // let filteredApartments = response.data.result.data.filter(
          //   (apartment) => apartment.img && apartment.sponsored
          // );
          // filteredApartments = response.data.result.data.slice(0, 10);

          this.images = response.data.result.map(function (apartment) {
            return [apartment.img, apartment.title_desc, apartment.slug];
          });
          this.addresses = response.data.addresses;
          this.images = this.images.filter(
            (image) => image[0] != "https://placehold.co/600x400"
          );
          // this.images = this.images.slice(0, 9);
          // this.sponsoredApartments = response.data.result.data;
        } else {
          console.error("formato immagine non valido");
        }
      });
    },

    // Metodo per generare l'attributo srcset
    getSrcSet(imageUrl) {
      const baseImageUrl = imageUrl.replace(/(\.[a-z]+)$/, "");
      const extension = imageUrl.match(/(\.[a-z]+)$/)[0];
      return `${baseImageUrl}-small${extension} 480w, ${baseImageUrl}-medium${extension} 768w, ${baseImageUrl}-large${extension} 1024w, ${imageUrl} 1280w`;
    },
  },

  mounted() {
    this.fetchApartments();
    this.setAutoPlay();
  },
};
</script>

<template>
  <div class="slider-container">
    <!-- <div class="row justify-content-center"> -->
    <h2>Alcuni appartamenti consigliati da noi:</h2>
    <div class="slide-box">
      <div
        class="slide position-relative"
        v-if="images.length > 0"
        tabindex="0"
        @mouseover="stopAutoPlay()"
        @mouseleave="setAutoPlay()"
      >
        <div class="info-absolute position-absolute">
          <h4 v-if="images.length > 0">
            <strong>{{ images[activeImg][1] }}</strong>
          </h4>
          <p v-if="images.length > 0">
            <strong>{{ addresses[activeImg] }}</strong>
          </p>
        </div>
        <router-link
          :to="{
            name: 'apartment-detail',
            params: { slug: images[activeImg][2] },
          }"
        >
          <img :src="images[activeImg][0]" alt="immagine" />
          <!-- <div class="overlay">
              {{ images[activeImg][1] }}
            </div> -->
        </router-link>
      </div>

      <!-- <div class="thumbs" :style="{ '--thumb-count': images.length }">
            <div class="prev" @click="prevSlide"></div>
            <div class="next" @click="nextSlide"></div>

            <img
              v-for="(image, index) in images"
              :key="index"
              :src="image[0]"
              class="thumb"
              :class="{
                active: index === activeImg,
                first: index === 0,
                last: index === images.length - 1,
              }"
            />
          </div> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
@use "../styles/general.scss";

.slider-container {
  height: calc(100vh - 145px);
  h2 {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-weight: bold;
    font-size: 2rem;
    background-color: aliceblue;
    box-shadow: 0px 0px 4px 2px aliceblue;
    position: relative;
    z-index: 1;
  }

  .slide-box {
    height: calc(100% - 70px);
    padding: 10px 18rem 100px 18rem;
    .slide {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.512);
      width: 100%;
      height: 100%;
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-absolute {
      left: 0;
      top: 0;
      z-index: 1;
      background-color: rgba(128, 128, 128, 0.5);
      color: white;
      padding: 5px 10px;
      border-bottom-right-radius: 10px;
    }
  }
}

// .slider-wrapper {
//   height: 500px;

//   border-radius: 20px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.512);
//   position: relative;
//   overflow: hidden;
// }

// .item {
//   object-fit: cover;

//   position: relative;
//   cursor: pointer;
// }

// .item img {
//   width: 880px;
//   height: 100%;

//   object-fit: cover;
//   // object-position: center;

//   border-radius: 20px 0 0 20px;
//   cursor: pointer;
//   image-rendering: auto;
// }

// .item .text {
//   position: absolute;
//   right: 20px;
//   bottom: 20px;
//   text-align: right;
//   color: white;
// }

// .thumbs {
//   float: left;
//   width: 120px;
//   background: #000;
//   position: relative;
//   font-size: 0;
//   border-radius: 0 20px 20px 0;
// }

// .thumb {
//   height: calc(100% / var(--thumb-count));

//   width: 120px;

//   object-fit: cover;

//   opacity: 0.5;
// }

// .thumb img {
//   width: 100%;
//   height: 100%;

//   object-fit: cover;
//   image-rendering: auto;
// }

// .thumb.active {
//   border: 2px solid #ccc;
//   opacity: 1;
// }

// .first {
//   border-radius: 0 20px 0 0;
// }

// .last {
//   border-radius: 0 0 20px 0;
// }

// .prev,
// .next {
//   width: 20px;
//   height: 20px;
//   margin: 10px 0;
//   border-radius: 50%;
//   background: #ccc;
//   position: absolute;
//   left: 50%;
//   transform: translate(-50%);
//   cursor: pointer;
//   z-index: 999;
// }

// .next {
//   bottom: 0;
// }

/*
EXTRA: in questo esempio gli accordion vengono creati
usando 2 bordi di un quadratino ruotato di 45 gradi
In una versione base si possono usare delle icone
oppure i caratteri ∧ (&and;) e ∨ (&or;)
 */
// .prev::after {
//   content: "";
//   width: 10px;
//   height: 10px;
//   border-top: 1px solid black;
//   border-right: 1px solid black;
//   display: block;
//   position: absolute;
//   top: 35%;
//   left: 50%;
//   transform: translate(-50%) rotate(-45deg);
// }

// .next::before {
//   content: "";
//   width: 10px;
//   height: 10px;
//   border-top: 1px solid black;
//   border-right: 1px solid black;
//   display: block;
//   position: absolute;
//   bottom: 35%;
//   left: 50%;
//   transform: translate(-50%) rotate(135deg);
// }

// .item .overlay {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.3);
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: 1;
//   transition: opacity 0.3s ease;
//   border-radius: 20px 0 0 20px;
//   font-size: 24px;
//   font-weight: bold;
// }

// .item:hover .overlay {
//   opacity: 1;
// }
@media screen and (max-width: 576px) {
  .slider-container {
    h2 {
      height: 60px;
      font-size: 1.2rem;
      padding: 0 1rem;
    }
    .slide-box {
      padding: 1rem 10px 4rem 10px;
      .info-absolute {
        h4 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    }
  }
  // .thumbs {
  //   display: none;
  // }

  // .item img {
  //   border-radius: 20px;
  //   object-fit: fill;
  // }
}
</style>
