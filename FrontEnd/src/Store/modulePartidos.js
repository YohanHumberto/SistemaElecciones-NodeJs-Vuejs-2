import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;
const defaultValue = {
    Id: null,
    Nombre: "",
    Descripcion: "",
    Logo: "",
    Estado: true
};

export default {
    state: {
        partidos: [],
        partido: defaultValue,
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async GetAllPartidos(state) {
            const data = await GetDataWithAutorization("/partidos/GetAll");

            if (data.Estado) state.partidos = data.partidos;
        },
        async GetByIdPartidos(state, Id) {
            const data = await GetDataWithAutorization(`/partidos/GetById${Id}`);

            if (data.Estado) state.partido = data.partido;
        },
        async AddPartidos(state, Partido) {
            const data = await PostDataWithAutorization(`/partidos/agregar`, Partido);

            state.hasError = !data.Estado;
            state.resMessage = data.msg;

            this.partido = defaultValue;
        },
        async EditPartidos(state, Partido) {
            const data = await PostDataWithAutorization(`/partidos/editar${Partido.Id}`, Partido);

            state.hasError = !data.Estado;
            state.resMessage = data.msg;

            this.partido = defaultValue;
        },
        async ChangeStatePartidos(state, Id) {
            const data = await GetDataWithAutorization(`/partidos/changeestado${Id}`);

            state.hasError = !data.Estado;
            state.resMessage = data.msg
        },
    },
    actions: {
        GetAllPartidos({ commit }) {
            commit("GetAllPartidos");
        },
        GetByIdPartidos({ commit }, payload) {
            commit("GetByIdPartidos", payload);
        },
        EditPartidos({ commit }, payload) {
            commit("EditPartidos", payload);
        },
        AddPartidos({ commit }, payload) {
            commit("AddPartidos", payload);
        },
        ChangeStatePartidos({ commit }, payload) {
            commit("ChangeStatePartidos", payload);
        },
    }
};
