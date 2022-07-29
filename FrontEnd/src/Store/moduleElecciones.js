import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;
const defaultValue = {
    Id: 0,
    Nombre: "",
    FechaDeRealizacion: new Date(),
    Estado: true
};
export default {
    state: {
        elecciones: [],
        Resultados: [],
        eleccion: defaultValue,
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async GetAllElecciones(state) {
            const data = await GetDataWithAutorization("/elecciones/GetAll");

            if (data.Estado) state.elecciones = data.elecciones;
        },
        async GetResultadosEleccionesById(state, IdEleccion) {
            const data = await GetDataWithAutorization(`/elecciones/resultados${IdEleccion}`);

            if (data.Estado) state.Resultados = data.Resultado;
        },
        async AddElecciones(state, Eleccion) {
            const data = await PostDataWithAutorization(`/elecciones/agregar`, Eleccion);

            state.hasError = !data.Estado;
            state.resMessage = data.msg

            this.eleccion = defaultValue;
        },
        async ChangeStateElecciones(state, Id) {
            const data = await GetDataWithAutorization(`/elecciones/changeestado${Id}`);

            state.hasError = !data.Estado;
            state.resMessage = data.msg
        },
    },
    actions: {
        GetAllElecciones({ commit }) {
            commit("GetAllElecciones");
        },
        GetResultadosEleccionesById({ commit }, payload) {
            commit("GetResultadosEleccionesById", payload);
        },
        AddElecciones({ commit }, payload) {
            commit("AddElecciones", payload);
        },
        ChangeStateElecciones({ commit }, payload) {
            commit("ChangeStateElecciones", payload);
        },
    }
};
