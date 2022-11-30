import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import TaskCompleted from "../views/TaskCompleted.vue";
import Trash from "../views/Trash.vue";
import Content from "../views/Content.vue";
const routes = [
    { path: "/login", name: "login-page", component: Login },
    {
        path: "/",
        component: Content,
        children: [
            {
                path: "/home",
                name: "home-page",
                component: Home,
            },
            {
                path: "/task-completed",
                name: "task-completed-page",
                component: TaskCompleted,
            },
            {
                path: "/trash",
                name: "trash-page",
                component: Trash,
            },
        ],
    },

    { path: "/:pathMatch(.*)*", name: "notfound-page", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    if (
        !localStorage.getItem("token") &&
        to.name !== "login-page" &&
        to.name !== "notfound-page"
    ) {
        return { name: "login-page" };
    } else if (
        localStorage.getItem("token") &&
        to.name === "login-page" &&
        to.name !== "notfound-page"
    ) {
        return { name: "home-page" };
    }
});
export default router;
