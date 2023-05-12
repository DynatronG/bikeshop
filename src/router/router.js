import About from "@/pages/AboutPage";
import Main from "@/pages/MainPage";
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
];
const router = createRouter({
      routes,
      history: createWebHashHistory(process.env.BASE_URL),
});
export default router;
