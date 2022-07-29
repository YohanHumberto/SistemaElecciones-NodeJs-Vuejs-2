import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;
const defaultValue = {
    Id: null,
    Nombre: "",
    Descripcion: "",
    Estado: true
};

export default {
    state: {
        puestosElectivos: [],
        puestoElectivo: defaultValue,
        hasError: false,
        resMessage: "",
        puestos: {}
    },
    mutations: {
        async GetAllPuestosElectivos(state) {
            const data = await GetDataWithAutorization("/puesto-electivo/GetAll");

            if (data.Estado) state.puestosElectivos = data.puestosElectivos;
        },
        async GetByIdPuestosElectivos(state, Id) {
            const data = await GetDataWithAutorization(`/puesto-electivo/GetById${Id}`);

            if (data.Estado) state.puestoElectivo = data.puestoElectivo;
        },
        async GetByDIdentidadPuestosElectivos(state, DIdentidad) {
            const data = await GetDataWithAutorization(`/puesto-electivo/GetByDIdentidad/${DIdentidad}`);

            if (data.Estado) state.puestos = data.Puestos;
        },
        async AddPuestosElectivos(state, PuestoElectivo) {
            const data = await PostDataWithAutorization(`/puesto-electivo/agregar`, PuestoElectivo);

            state.hasError = !data.Estado;
            state.resMessage = data.msg

            this.puestoElectivo = defaultValue;
        },
        async EditPuestosElectivos(state, PuestoElectivo) {
            const data = await PostDataWithAutorization(`/puesto-electivo/editar${PuestoElectivo.Id}`, PuestoElectivo);

            state.hasError = !data.Estado;
            state.resMessage = data.msg

            this.puestoElectivo = defaultValue;
        },
        async ChangeStatePuestosElectivos(state, Id) {
            const data = await GetDataWithAutorization(`/puesto-electivo/changeestado${Id}`);

            state.hasError = !data.Estado;
            state.resMessage = data.msg
        },
    },
    actions: {
        GetAllPuestosElectivos({ commit }) {
            commit("GetAllPuestosElectivos");
        },
        GetByIdPuestosElectivos({ commit }, payload) {
            commit("GetByIdPuestosElectivos", payload);
        },
        GetByDIdentidadPuestosElectivos({ commit }, payload) {
            commit("GetByDIdentidadPuestosElectivos", payload);
        },
        EditPuestosElectivos({ commit }, payload) {
            commit("EditPuestosElectivos", payload);
        },
        AddPuestosElectivos({ commit }, payload) {
            commit("AddPuestosElectivos", payload);
        },
        ChangeStatePuestosElectivos({ commit }, payload) {
            commit("ChangeStatePuestosElectivos", payload);
        },
    }
};
