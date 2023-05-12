import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import "./assets/index.css";
import "./firebase/config";
import router from "./router/router";

// import components from "@/components/";
const app = createApp(App);
// components.forEach((component) => {
//   app.component(component.name, component);
// });

app.use(store);
app.use(router);
app.mount("#app");
