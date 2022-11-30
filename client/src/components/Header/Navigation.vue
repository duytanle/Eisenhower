<script>
import { useToast } from "vue-toastification";
import router from "../../router/index.js";
import RemindModal from "../GlobalComponents/RemindModal.vue";

export default {
    components: { RemindModal },

    methods: {
        holdFocus(event) {
            const routerLinks = document.querySelectorAll(
                ".nav-item .nav-link.handler-background"
            );
            routerLinks.forEach((link) => {
                link.classList.remove("active");
            });
            event.target.classList.add("active");
        },
        logout() {
            localStorage.clear();
            useToast().success("Đăng xuất thành công!");
            router.push({ name: "login-page" });
        },
    },
    mounted() {
        const links = document.querySelectorAll(".nav-item .nav-link");
        const content = document.querySelector(".main-content");
        links.forEach((link) => {
            link.classList.remove("active");
        });
        const classList = content.children[0].classList;
        if (classList.contains("home-page")) {
            links[0].classList.add("active");
        } else if (classList.contains("task-completed")) {
            links[1].classList.add("active");
        } else if (classList.contains("trash")) {
            links[2].classList.add("active");
        }
    },
};
</script>

<template>
    <div class="nav">
        <nav class="navbar navbar-expand-lg bg-light position-fixed w-100">
            <div class="container-fluid">
                <a class="navbar-brand fs-3 px-3" href="#">Eisenhower</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
                        <li class="nav-item" @click="holdFocus">
                            <!-- active to link clicked -->
                            <router-link
                                to="/home"
                                class="nav-link handler-background rounded-5 px-3 active"
                                aria-current="page"
                                >TRANG CHỦ</router-link
                            >
                        </li>
                        <li class="nav-item" @click="holdFocus">
                            <router-link
                                to="/task-completed"
                                class="nav-link handler-background rounded-5 px-3"
                                >CÔNG VIỆC HOÀN THÀNH</router-link
                            >
                        </li>
                        <li class="nav-item" @click="holdFocus">
                            <router-link
                                to="/trash"
                                class="nav-link handler-background rounded-5 px-3"
                                >THÙNG RÁC</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                data-bs-toggle="modal"
                                data-bs-target="#remind-logout"
                                class="nav-link rounded-5 px-3"
                                >ĐĂNG XUẤT</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <remind-modal :id="`remind-logout`" @confirmAction="logout">
            <template v-slot:remind-content>
                <p class="fs-5 fw-bold">Bạn có chắc muốn đăng xuất không?</p>
            </template>
            <template v-slot:remind-confirm>Có</template>
        </remind-modal>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");

nav {
    background-image: linear-gradient(
        to right,
        var(--secondary-color),
        var(--primary-color)
    );
    z-index: 2;
}

.nav-item {
    cursor: pointer;
}
.nav-link.active {
    background-color: white;
}
.navbar-brand {
    font-family: "Fredoka One", cursive;
    color: #0070f1;
}
.navbar-brand:focus,
.navbar-brand:hover {
    color: #0070f1;
}

.nav-link {
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    width: fit-content;
}

.nav-link:hover {
    background-color: white;
}

.active {
    color: blue !important;
    background-color: white;
}
.nav-item {
    margin-right: 1.1rem;
}
</style>
