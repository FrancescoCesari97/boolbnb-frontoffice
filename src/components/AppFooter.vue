<script>
import { store } from "../store";

export default {
  data() {
    return {};
  },
};
</script>

<template>
  <footer class="text-white">
    <div class="container">
      <div class="d-flex justify-content-between gap-3">
        <div>
          <p class="h5 fw-bold text-pink">&copy; BOOLBNB, TEAM 4</p>

          <div class="social">
            <p>Trovaci anche sui nostri social!</p>
            <ul class="list-unstyled d-flex justify-content-around fs-5">
              <li class="me-3">
                <a href="https://www.instagram.com/"
                  ><font-awesome-icon icon="fa-brands fa-instagram"
                /></a>
              </li>
              <li class="me-3">
                <a href="https://twitter.com/i/flow/login"
                  ><font-awesome-icon icon="fa-brands fa-x-twitter"
                /></a>
              </li>
              <li class="me-3">
                <a href="https://www.facebook.com/?locale=it_IT"
                  ><font-awesome-icon icon="fa-brands fa-facebook"
                /></a>
              </li>
              <li>
                <a href="https://www.skype.com/it/"
                  ><font-awesome-icon icon="fa-brands fa-skype"
                /></a>
              </li>
            </ul>
          </div>
        </div>

        <div class="info">
          <div class="row">
            <div class="col">
              <div class="h5 fw-bold text-pink">INFO UTILI</div>
            </div>
          </div>
          <ul>
            <li><a href="#">Informativa sulla privacy</a></li>
            <li><a href="#">Informazioni legali</a></li>
            <li><a href="#">Diritto di recesso</a></li>
          </ul>
        </div>

        <div class="contacts">
          <div>
            <div class="h5 fw-bold text-pink">CONTATTI</div>
          </div>

          <ul>
            <li>
              <a href="mailto:info@boolbnb.com">
                <font-awesome-icon icon="fa-solid fa-envelope" class="pe-1" />
                <span>info@boolbnb.com</span>
              </a>
            </li>
            <li>
              <a href="tel:+123456789">
                <font-awesome-icon icon="fa-solid fa-phone" class="pe-1" />
                <span>+123456789</span>
              </a>
            </li>
            <li>
              <a href="">
                <font-awesome-icon
                  icon="fa-solid fa-location-dot"
                  class="pe-1"
                />
                <span>Via Roma, 123</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  box-shadow: 0px -2px 3px 4px var(--main-color);
  height: 145px;
  position: relative;
  z-index: 1;
  padding: 24px;

  background: linear-gradient(to bottom, var(--main-color), var(--gray));

  ul {
    padding: 0;
  }

  .list-unstyled {
    a:hover {
      opacity: 0.8;
    }
  }

  a {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: underline;
      color: white;
    }
  }

  // .col-4 {
  //   text-align: center;
  // }
}

.text-pink {
  color: var(--rose-red);
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 576px) {
  footer {
    height: auto;
    padding: 10px;
    .container {
      padding: 0;
    }
  }
}
</style>
