import { createStore } from 'vuex';
import moduleAuth from './moduleAuth';
import moduleCandidatos from './moduleCandidatos';
import moduleCiudadanos from './moduleCiudadanos';
import moduleElecciones from './moduleElecciones';
import modulePartidos from './modulePartidos';
import modulePuestosElectivos from './modulePuestosElectivos';
import moduleVotos from './moduleVotos';


export default createStore({
    state: {
        isLogged: "klk",
        videotecas: [],
        historias: [],
        audios: [],
    },
    mutations: {
        // cargarVideos(state) {
        //     state.historias = historia;
        //     state.videotecas = videoteca;
        //     state.audios = audios;
        // },
        // BuscarVideos(state, texto) {
        //     texto == ""
        //         ? state.videotecas = videoteca
        //         : state.videotecas = videoteca.filter(item => item.title.toLowerCase().indexOf(texto.toLowerCase()) !== -1);
        // },
        // BuscarAudios(state, texto) {
        //     texto == ""
        //         ? state.audios = audios
        //         : state.audios = audios.filter(item => item.gender.toLowerCase().indexOf(texto.toLowerCase()) !== -1);
        // },
    },
    actions: {
        // cargarVideos({ commit }) {
        //     commit("cargarVideos");
        // },
        // BuscarVideos({ commit }, payload) {
        //     commit("BuscarVideos", payload);
        // },
        // BuscarAudios({ commit }, payload) {
        //     commit("BuscarAudios", payload);
        // },
    },
    modules: {
        moduleAuth,
        moduleCandidatos,
        moduleCiudadanos,
        moduleElecciones,
        modulePartidos,
        modulePuestosElectivos,
        moduleVotos,
    }
})
