<script>
import config from "../../config/index.js";
import axios from "axios";
import router from "../../router/index.js";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
    props: [],
    emit: ["update:login"],
    data() {
        return {
            authInfo: {
                username: "",
                password: "",
            },
            toast: {},
        };
    },
    computed: {
        ...mapGetters({ isLogin: "getIsLogin" }),
    },
    methods: {
        showSignup() {
            this.$emit("update:login", false);
        },

        async login(event) {
            event.preventDefault();
            if (!this.authInfo.username || !this.authInfo.password)
                this.toast.error("Thông tin đăng nhập không để trống");
            else {
                await this.$store.dispatch("login", this.authInfo);
                if (this.isLogin.status) {
                    this.toast.success(`${this.isLogin.message}`);
                    this.$router.push({ path: "/home" });
                } else {
                    this.toast.error(`${this.isLogin.message}`);
                }
            }
        },
    },
    created() {
        this.toast = useToast();
    },
    mounted() {
        const inputs = document.querySelectorAll(".input");
        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }

        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value == "") {
                parent.classList.remove("focus");
            }
        }

        inputs.forEach((input) => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    },
};
</script>

<template>
    <div
        class="login-content d-flex flex-column justify-content-center align-items-center text-center animate__animated animate__fadeIn"
    >
        <form action="" class="p-5 rounded-5">
            <h4 class="title mb-5">ĐĂNG NHẬP</h4>
            <div class="input-div one row position-relative py-1 mb-4 mt-0">
                <div
                    class="i col-2 position-relative d-flex justify-content-center align-items-center"
                >
                    <box-icon name="user"></box-icon>
                </div>
                <div class="div col-10 position-relative">
                    <h5>Tên đăng nhập</h5>
                    <input
                        type="text"
                        class="input position-absolute top-0 start-0 w-100 h-100"
                        v-model="authInfo.username"
                    />
                </div>
            </div>
            <div class="input-div pass row position-relative py-1 mb-4">
                <div
                    class="i col-2 position-relative d-flex justify-content-center align-items-center"
                >
                    <box-icon name="lock-alt"></box-icon>
                </div>
                <div class="div col-10 position-relative">
                    <h5>Mật khẩu</h5>
                    <input
                        type="password"
                        class="input position-absolute top-0 start-0 w-100 h-100"
                        v-model="authInfo.password"
                    />
                </div>
            </div>
            <a href="#" class="d-block text-end">Quên mật khẩu?</a>
            <button
                type="submit"
                class="btn mt-4 d-block w-100 rounded-5 fs-5 text-white"
                @click="login($event)"
            >
                Đăng nhập
            </button>
        </form>
        <p class="mt-3">
            Bạn chưa có tài khoản?
            <span class="link__signup" @click="showSignup"
                ><strong>Đăng ký ngay!</strong></span
            >
        </p>
    </div>
</template>

<style scoped>
form {
    width: 360px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.login-content img {
    height: 100px;
}

.login-content .input-div {
    border-bottom: 2px solid #d9d9d9;
}

.i {
    color: #d9d9d9;
}

.i i {
    transition: 0.3s;
}

.input-div > div {
    height: 45px;
}

.input-div > div > h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: 0.3s;
}

.input-div:before,
.input-div:after {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: var(--secondary-color);
    transition: 0.4s;
}

.input-div:before {
    right: 50%;
}

.input-div:after {
    left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
    width: 50%;
}

.input-div.focus > div > h5 {
    top: -5px;
    font-size: 15px;
}

.input-div.focus > .i > i {
    color: var(--secondary-color);
}

.input-div > div > input {
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
}

.btn {
    height: 50px;
    outline: none;
    border: none;
    background-color: var(--primary-color);
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.5s;
}
.btn:hover {
    background-color: var(--btn-hover);
}
a {
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;
}

a:hover {
    color: var(--secondary-color);
}

.link__signup {
    color: var(--primary-color);
}
.link__signup:hover {
    cursor: pointer;
}
</style>
