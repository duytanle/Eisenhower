<script>
import "boxicons";
import LoginForm from "../components/Login/LoginForm.vue";
import SignupForm from "../components/Login/SignupForm.vue";

export default {
    components: {
        LoginForm,
        SignupForm,
    },
    data() {
        return {
            login: true,
        };
    },
    methods: {
        loginSuccess() {
            this.$emit("loginSuccess");
        },
    },
};
</script>

<template>
    <div class="login p-4 animate__animated animate__fadeIn">
        <img class="wave" src="../assets/waveFix2.png" />
        <h1 class="p-0 fw-bold">HỆ THỐNG QUẢN LÝ CÔNG VIỆC</h1>
        <div class="container mt-4">
            <div class="login-img">
                <img src="../assets/1.svg" />
            </div>
            <login-form
                v-if="login"
                v-model:login="login"
                @loginSuccess="loginSuccess"
            ></login-form>
            <signup-form v-if="!login" v-model:login="login"></signup-form>
        </div>
    </div>
</template>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.wave {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
}

h1 {
    background-image: linear-gradient(
        to right,
        var(--secondary-color),
        var(--primary-color)
    );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
.container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
    margin: 0 auto;
}

.login-img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.login-img img {
    width: 500px;
    height: 600px;
}
</style>
