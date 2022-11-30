import axios from "axios";
import router from "../router/index.js";
import config from "../config/index.js";
const authModule = {
    state: {
        isLogin: { status: false, message: "" },
        account: {},
    },
    getters: {
        getIsLogin(state) {
            return state.isLogin;
        },
        getAccount(state) {
            return state.account;
        },
        getToken(state) {
            return state.token;
        },
    },
    mutations: {
        SET_ACCOUNT(state, account) {
            state.account = account;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_IS_LOGIN(state, isLogin) {
            state.isLogin.status = isLogin.status;
            state.isLogin.message = isLogin.message;
        },
    },
    actions: {
        async login({ commit }, authInfo) {
            const res = await axios.post(`${config.domain}/auth/login`, {
                username: authInfo.username,
                password: authInfo.password,
            });
            let status = res.data.status;
            let message = res.data.message;
            commit("SET_IS_LOGIN", { status, message });
            if (status) {
                commit("SET_ACCOUNT", res.data.result);
                localStorage.setItem("token", res.data.accessToken);
                router.push({ path: "/" });
            }
        },
        async getAccount({ commit }) {
            const token = localStorage.getItem("token");
            if (token) {
                const res = await axios.get(
                    `${config.domain}/auth/get-account`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                if (res.data.status) {
                    commit("SET_ACCOUNT", res.data.result);
                }
            }
        },
    },
};
export default authModule;
