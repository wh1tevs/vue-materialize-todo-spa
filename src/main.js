import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "normalize.css";
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize";
import "@/assets/base.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
