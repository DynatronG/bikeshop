import { createApp } from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import "./assets/index.css";
// import components from "@/components/";

const app = createApp(App);

// components.forEach((component) => {
//   app.component(component.name, component);
// });

app.use(store);
app.mount("#app");
