<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import config from "../../config/index.js";
export default {
    data() {
        return {
            register: {
                name: "",
                username: "",
                password: "",
                retypePassword: "",
            },
            toast: {},
        };
    },
    methods: {
        showLogin() {
            this.$emit("update:login", true);
        },

        async signup(event) {
            event.preventDefault();
            const res = await axios.post(`${config.domain}/auth/register`, {
                name: this.register.name,
                username: this.register.username,
                password: this.register.password,
                retypePassword: this.register.retypePassword,
            });
            if (res.data.status) {
                this.toast.success(`${res.data.message}`);
                this.$router.push({ name: "login-page" });
                this.$emit("update:login", true);
            } else {
                this.toast.error(`${res.data.message}`);
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
            <h4 class="title mb-4">ĐĂNG KÝ</h4>
            <div class="input-div one">
                <div class="i">
                    <box-icon name="face"></box-icon>
                </div>
                <div class="div">
                    <h5>Họ và tên</h5>
                    <input type="text" class="input" v-model="register.name" />
                </div>
            </div>
            <div class="input-div one">
                <div class="i">
                    <box-icon name="user"></box-icon>
                </div>
                <div class="div">
                    <h5>Tên đăng nhập</h5>
                    <input
                        type="text"
                        class="input"
                        v-model="register.username"
                    />
                </div>
            </div>
            <div class="input-div pass">
                <div class="i">
                    <box-icon name="lock-alt"></box-icon>
                </div>
                <div class="div">
                    <h5>Mật khẩu</h5>
                    <input
                        type="password"
                        class="input"
                        v-model="register.password"
                    />
                </div>
            </div>
            <div class="input-div pass">
                <div class="i">
                    <box-icon name="lock-alt"></box-icon>
                </div>
                <div class="div">
                    <h5>Nhập lại mật khẩu</h5>
                    <input
                        type="password"
                        class="input"
                        v-model="register.retypePassword"
                    />
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-primary mt-4"
                @click="signup"
                :disabled="
                    !this.register.name ||
                    !this.register.username ||
                    !this.register.password ||
                    !this.register.retypePassword
                "
            >
                Đăng ký
            </button>
        </form>
        <p class="mt-3">
            Bạn đã có tài khoản?
            <span class="link__signup" @click="showLogin($event)"
                ><strong>Đăng nhập ngay!</strong></span
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
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.i {
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.i i {
    transition: 0.3s;
}

.input-div > div {
    position: relative;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: "poppins", sans-serif;
}

.input-div.pass {
    margin-bottom: 4px;
}

.btn {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: var(--primary-color);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: 0.5s;
}
a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: 0.3s;
}

a:hover {
    color: var(--secondary-color);
}
.btn:hover {
    background-position: right;
}

.link__signup {
    color: var(--primary-color);
}
.link__signup:hover {
    cursor: pointer;
}
</style>
