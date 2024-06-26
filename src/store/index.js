import { reactive } from "vue";

export const api = {
  baseUrl: "http://127.0.0.1:8000/api/",
};

export const store = reactive({
  apartments: [],
  addressSearch: "",
  roomsSearch: 1,
  bedsSearch: 1,
  bathroomsSearch: 1,
  servicesSearch: [],
  rangeSearch: 20,
  services: [
    {
      name: "Wifi",
      logo: "fa-wifi",
    },
    {
      name: "Posto macchina",
      logo: "fa-square-parking",
    },
    {
      name: "Piscina",
      logo: "fa-person-swimming",
    },
    {
      name: "Portineria",
      logo: "fa-bell-concierge",
    },
    {
      name: "Sauna",
      logo: "fa-hot-tub-person",
    },
    {
      name: "Vista mare",
      logo: "fa-water",
    },
    {
      name: "Giardino",
      logo: "fa-seedling",
    },
    {
      name: "Ascensore",
      logo: "fa-elevator",
    },
    {
      name: "Animali ammessi",
      logo: "fa-paw",
    },
    {
      name: "Aria condizionata",
      logo: "fa-snowflake",
    },
  ],
});
