import About from "@/pages/AboutPage";
import Main from "@/pages/MainPage";
import AddBike from "@/pages/AddBike";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
      {
            path: "/",
            component: Main,
      },
      {
            path: "/about",
            component: About,
      },
      { path: "/addBike", component: AddBike },
];
const router = createRouter({
      routes,
      history: createWebHashHistory(process.env.BASE_URL),
});
export default router;
