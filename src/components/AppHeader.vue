<script>
import { store } from "../store";

export default {
  data() {
    return {
      title: "BoolBnB",
      user: false,
    };
  },
};
</script>

<template>
  <header>
    <div
      class="container h-100 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex">
        <router-link :to="{ name: 'homepage' }">
          <div class="logo-box d-flex">
            <img src="../assets/logo.png" alt="logo" />
          </div>
        </router-link>
        <div class="title align-self-center">{{ this.title }}</div>
      </div>
      <div class="login-box gap-2 d-flex align-items-center">
        <a href="http://127.0.0.1:8000/login">
          <div v-if="this.user == true" class="btn btn-info">
            <p>Area personale</p>
          </div>
        </a>
        <div class="user-logo" @click="this.user = !this.user">
          <font-awesome-icon icon="fa-solid fa-circle-user" class="user" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// @use "../styles/general.scss";

header {
  height: 120px;
  background-color: var(--main-color);
  box-shadow: 0px -2px 3px 4px var(--main-color);
  background: linear-gradient(to top, var(--main-color), var(--gray));
  position: relative;
  z-index: 1;
  .title {
    font-size: 60px;
    font-weight: bold;
    color: #600b1f;
    opacity: 0.9;
    text-shadow: 0 0 2px;
  }

  .logo-box {
    height: 100px;
    aspect-ratio: 1;

    img {
      mix-blend-mode: multiply;
      width: 100%;
      height: 100%;
    }
  }

  .login-box {
    height: 60px;
    .user-logo {
      .user {
        font-size: 50px;
        color: #600b1f;
        cursor: pointer;
        &:hover {
          color: #9e374f;
          opacity: 1;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  header {
    .title {
      font-size: 30px;
      font-weight: bold;
      color: #600b1f;
      opacity: 0.9;
      text-shadow: 0 0 2px;
    }
    .logo-box {
      height: 90px;
      aspect-ratio: 1;

      img {
        mix-blend-mode: multiply;
        width: 100%;
        height: 100%;
      }
    }

    .login-box {
      height: 60px;
      .user-logo {
        .user {
          font-size: 40px;
          color: #600b1f;
          cursor: pointer;
          &:hover {
            color: #9e374f;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
