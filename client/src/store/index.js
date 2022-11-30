import { createStore } from "vuex";
import authModule from "./authModule.js";
import userModule from "./userModule.js";
const store = createStore({
    modules: { authModule, userModule },
});

export default store;
