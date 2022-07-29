import MainLayout from "../Views/Layout/MainLayout.vue";
import LoginElector from "../Views/Elector/LoginElector.vue";
import Candidatos from "../Views/Elector/Candidatos.vue";
import PuestosElectorales from "../Views/Elector/PuestosElectorales.vue";

const ElectorRoutes = [
    {
        path: '/elector-login', components: { default: MainLayout },
        children: [
            { path: '', component: LoginElector }
        ]
    },
    {
        path: "/elector",
        components: {
            default: MainLayout,
        },
        beforeEnter: (to, from, next) => {
            function parseJwt(token) {
                var base64Url = token?.split('.')[1];
                var base64 = base64Url?.replace('-', '+').replace('_', '/');

                return JSON.parse(window.atob(base64));
            };

            console.log(sessionStorage.getItem("token"))
            sessionStorage.getItem("token") 
            parseJwt(sessionStorage.getItem("token")).ElectorIsAuthenticated ? next() : next(false);
        },
        children: [
            { path: 'puestos-electivos', component: PuestosElectorales },
            { path: 'candidatos', component: Candidatos },
        ]
    }


]

export default ElectorRoutes;