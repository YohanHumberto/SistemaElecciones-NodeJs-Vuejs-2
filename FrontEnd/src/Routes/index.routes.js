import { createRouter, createWebHistory } from "vue-router";
import Home from "../Views/Home.vue";
import AdminRoutes from "./Admin.routes";
import ElectorRoutes from "./Elector.routes";

const routes = [
    { path: "/", component: Home },
    ...AdminRoutes,
    ...ElectorRoutes
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;