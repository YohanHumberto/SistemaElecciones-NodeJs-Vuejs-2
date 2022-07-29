import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;
const defaultValue = {
    Id: null,
    Nombre: "",
    Apellido: "",
    partidoId: "",
    puestoElectivoId: "",
    Image: "/",
    Estado: true,
};

export default {
    state: {
        candidatos: [],
        candidato: defaultValue,
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async GetAllCandidatos(state) {
            const data = await GetDataWithAutorization("/candidatos/GetAll");
            if (data.Estado) state.candidatos = data.candidatos;
        },
        async GetByIdCandidatos(state, Id) {
            const data = await GetDataWithAutorization(`/candidatos/GetById${Id}`);
            if (data.Estado) state.candidato = data.candidato;
        },
        async AddCandidatos(state, candidato) {
            const data = await PostDataWithAutorization(`/candidatos/agregar`, candidato);
            state.hasError = !data.Estado;
            state.resMessage = data.msg;
            this.candidato = defaultValue;
        },
        async EditCandidatos(state, candidato) {
            const data = await PostDataWithAutorization(`/candidatos/editar${candidato.Id}`, candidato);
            state.hasError = !data.Estado;
            state.resMessage = data.msg;
            this.candidato = defaultValue;
        },
        async ChangeStateCandidatos(state, Id) {
            const data = await GetDataWithAutorization(`/candidatos/changeestado${Id}`);
            state.hasError = !data.Estado;
            state.resMessage = data.msg;
        },
    },
    actions: {
        GetAllCandidatos({ commit }) {
            commit("GetAllCandidatos");
        },
        GetByIdCandidatos({ commit }, payload) {
            commit("GetByIdCandidatos", payload);
        },
        EditCandidatos({ commit }, payload) {
            commit("EditCandidatos", payload);
        },
        AddCandidatos({ commit }, payload) {
            commit("AddCandidatos", payload);
        },
        ChangeStateCandidatos({ commit }, payload) {
            commit("ChangeStateCandidatos", payload);
        },
    }
};
