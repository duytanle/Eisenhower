<script></script>

<template>
    <div
        class="not-found d-flex flex-column justify-content-center align-items-center p-5"
    >
        <h2 class="position-absolute">KHÔNG TÌM THẤY TRANG</h2>
        <img src="../assets/dribbble_1.gif" alt="" />
        <router-link to="/home" class="go-home position-absolute"
            >VỀ TRANG CHỦ</router-link
        >
    </div>
</template>

<style scoped>
.not-found {
    height: 100vh;
}
.not-found h2 {
    top: 10%;
    font-size: 3rem;
    font-weight: bold;
    background-image: linear-gradient(
        to right,
        var(--secondary-color),
        var(--primary-color)
    );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}

.go-home {
    bottom: 10%;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 1rem;
    background-image: linear-gradient(
        to right,
        var(--secondary-color),
        var(--primary-color)
    );
    color: white;
    border-radius: 50px;
}

.go-home:hover {
    background-image: linear-gradient(to right, #22caab, #3783da);
}
</style>
