import { createApp } from "vue";
import Toast from "vue-toastification";
import router from "./router/index.js";
import "vue-toastification/dist/index.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import App from "./App.vue";
import store from "./store/index.js";
const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast, {
    position: "bottom-right",
    newestOnTop: false,
    timeout: 3000,
    hideProgressBar: true,
    maxToasts: 2,
});
app.mount("#app");
