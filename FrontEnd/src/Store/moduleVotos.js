import fetch from "../assets/Util/fetch.http"
const { PostDataWithAutorization } = fetch;

export default {
    state: {
        Votos: [],
        Partido: {},
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async AddVotos(state, DIdentidad) {
            const data = await PostDataWithAutorization(`/Voto/${DIdentidad}`, {});

            state.hasError = !data.Estado;
            state.resMessage = data.msg
        }
    },
    actions: {
        AddVotos({ commit }, payload) {
            commit("AddVotos", payload);
        },
    }
};
