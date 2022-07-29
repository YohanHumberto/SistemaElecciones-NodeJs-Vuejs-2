import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;
const defaultValue = {
    DocumentoDeIdentidad: "",
    Nombre: "",
    Apellido: "",
    Email: "",
    Estado: true
};

export default {
    state: {
        ciudadanos: [],
        ciudadano: defaultValue,
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async GetAllCiudadanos(state) {
            const data = await GetDataWithAutorization("/ciudadanos/GetAll");

            if (data.Estado) state.ciudadanos = data.ciudadanos;
        },
        async GetByIdCiudadanos(state, Id) {
            const data = await GetDataWithAutorization(`/ciudadanos/GetById${Id}`);

            if (data.Estado) state.ciudadano = data.ciudadano;
        },
        async AddCiudadanos(state, ciudadano) {
            const data = await PostDataWithAutorization(`/ciudadanos/agregar`, ciudadano);

            state.hasError = !data.Estado;
            state.resMessage = data.msg;

            this.ciudadano = defaultValue;

        },
        async EditCiudadanos(state, ciudadano) {
            const data = await PostDataWithAutorization(`/ciudadanos/editar${ciudadano.DocumentoDeIdentidad}`, ciudadano);

            state.hasError = !data.Estado;
            state.resMessage = data.msg;

            this.ciudadano = defaultValue;
        },
        async ChangeStateCiudadanos(state, Id) {
            const data = await GetDataWithAutorization(`/ciudadanos/changeestado${Id}`);

            state.hasError = !data.Estado;
            state.resMessage = data.msg
        },
    },
    actions: {
        GetAllCiudadanos({ commit }) {
            commit("GetAllCiudadanos");
        },
        GetByIdCiudadanos({ commit }, payload) {
            commit("GetByIdCiudadanos", payload);
        },
        EditCiudadanos({ commit }, payload) {
            commit("EditCiudadanos", payload);
        },
        AddCiudadanos({ commit }, payload) {
            commit("AddCiudadanos", payload);
        },
        ChangeStateCiudadanos({ commit }, payload) {
            commit("ChangeStateCiudadanos", payload);
        },
    }
};
