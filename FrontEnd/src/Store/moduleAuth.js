import fetch from "../assets/Util/fetch.http"
const { GetDataWithAutorization, PostDataWithAutorization } = fetch;

export default {
    state: {
        AdminIsLogin: false,
        ElectorIsLogin: false,
        hasError: false,
        resMessage: ""
    },
    mutations: {
        async LoginAdmin(state, user) {
            const data = await PostDataWithAutorization("/login-admin", user);
            state.hasError = !data.Estado;
            state.resMessage = data.msg
            if (data.Estado) {
                sessionStorage.setItem("token", JSON.stringify(data.token));
                state.AdminIsLogin = true;
            }
        },
        async LoginElector(state, user) {
            const data = await PostDataWithAutorization(`/login-elector`, user);
            state.hasError = !data.Estado;
            state.resMessage = data.msg
            if (data.Estado) {
                sessionStorage.setItem("token", JSON.stringify(data.token));
                state.ElectorIsLogin = true;
            }
        },
        async LogoutAdmin(state) {
            // const data = await PostDataWithAutorization(`/logout-admin`, Partido);
            // state.hasError = !data.Estado;
            // state.resMessage = data.msg
            sessionStorage.removeItem("token");
            state.AdminIsLogin = false;
        },
        async LogoutElector(state) {
            // const data = await PostDataWithAutorization(`/logout-elector`, Partido);
            // state.hasError = !data.Estado;
            // state.resMessage = data.msg
            sessionStorage.removeItem("token");
            state.ElectorIsLogin = false;
        },

    },
    actions: {
        LoginAdmin({ commit }, payload) {
            commit("LoginAdmin", payload);
        },
        LoginElector({ commit }, payload) {
            commit("LoginElector", payload);
        },
        LogoutAdmin({ commit }) {
            commit("LogoutAdmin");
        },
        LogoutElector({ commit }) {
            commit("LogoutElector");
        },
    }
};
