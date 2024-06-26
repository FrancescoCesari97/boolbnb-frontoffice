import { createApp } from "vue";

import App from "./App.vue";
import { router } from "./router";
import * as bootstrap from "bootstrap";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
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
  faPhone,
  faEnvelope,
  faCircleUser,
  faFire,
  faReply,
  faBed,
  faArrowsLeftRightToLine,
  faPersonShelter,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
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
  faPhone,
  faEnvelope,
  faCircleUser,
  faFire,
  faReply,
  faBed,
  faArrowsLeftRightToLine,
  faPersonShelter,
  faX,
  far,
  fab
);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
