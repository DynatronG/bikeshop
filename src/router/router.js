import About from "@/pages/AboutPage";
import Main from "@/pages/MainPage";
import AddBike from "@/pages/AddBike";
import LoginPage from "@/pages/LoginPage";
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
      { path: "/login", component: LoginPage },
];
const router = createRouter({
      routes,
      history: createWebHashHistory(process.env.BASE_URL),
});
export default router;
