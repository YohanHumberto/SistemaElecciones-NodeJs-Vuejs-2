import LoginAdmin from "../Views/Admin/LoginAdmin.vue";
import MainLayout from "../Views/Layout/MainLayout.vue";
import Opcciones from "../Views/Admin/Opcciones.vue";
import FormCandidatos from "../Views/Admin/Candidatos/FormCandidatos.vue";
import ListCandidatos from "../Views/Admin/Candidatos/ListCandidatos.vue";
import FormCiudadanos from "../Views/Admin/Ciudadanos/FormCiudadanos.vue";
import ListCiudadanos from "../Views/Admin/Ciudadanos/ListCiudadanos.vue";
import FormElecciones from "../Views/Admin/Elecciones/FormElecciones.vue";
import ListElecciones from "../Views/Admin/Elecciones/ListElecciones.vue";
import ListResultadosElecciones from "../Views/Admin/Elecciones/ListResultadosElecciones.vue"
import FormPartidos from "../Views/Admin/Partidos/FormPartidos.vue";
import ListPartidos from "../Views/Admin/Partidos/ListPartidos.vue";
import FormPuestosElectivos from "../Views/Admin/PuestosElectivos/FormPuestosElectivos.vue";
import ListPuestosElectivos from "../Views/Admin/PuestosElectivos/ListPuestosElectivos.vue";


const AdminRoutes = [
    {
        path: '/admin-login', components: { default: MainLayout },
        children: [
            { path: '', component: LoginAdmin }
        ]
    },
    {
        path: "/admin",
        components: {
            default: MainLayout,
        },
        beforeEnter: (to, from, next) => {
            function parseJwt(token) {
                var base64Url = token?.split('.')[1];
                var base64 = base64Url?.replace('-', '+').replace('_', '/');

                return JSON.parse(window.atob(base64));
            };
            parseJwt(sessionStorage.getItem("token")).IsAdmin ? next() : next(false);
        },
        children: [
            { path: 'opcciones', component: Opcciones },
            // Candidatos
            { path: 'candidatos', component: ListCandidatos },
            { path: 'candidatos/add', component: FormCandidatos },
            { path: 'candidatos/edit:id', component: FormCandidatos },
            //Ciudadano
            { path: 'ciudadanos', component: ListCiudadanos },
            { path: 'ciudadanos/add', component: FormCiudadanos },
            { path: 'ciudadanos/edit/:DocumentoDeIdentidad', component: FormCiudadanos },
            //partidos
            { path: 'partidos', component: ListPartidos },
            { path: 'partidos/add', component: FormPartidos },
            { path: 'partidos/edit/:id', component: FormPartidos },
            //Elecciones
            { path: 'elecciones', component: ListElecciones },
            { path: 'elecciones/add', component: FormElecciones },
            { path: 'elecciones/resultados/:id', component: ListResultadosElecciones },
            //Puestos Electivos
            { path: 'puesto-electivo', component: ListPuestosElectivos },
            { path: 'puesto-electivo/add', component: FormPuestosElectivos },
            { path: 'puesto-electivo/edit/:id', component: FormPuestosElectivos },
        ]
    }


]

export default AdminRoutes;