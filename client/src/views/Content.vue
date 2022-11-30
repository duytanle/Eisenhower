<template>
    <div class="content row mx-0 justify-content-center">
        <navigation></navigation>
        <div class="main-content col-sm-12 col-md-12 col-lg-11">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Navigation from "../components/Header/Navigation.vue";

export default {
    components: { Navigation },
    computed: {
        ...mapGetters({ account: "getAccount" }),
    },
    async created() {
        await this.$store.dispatch("getAccount");
    },
};
</script>

<style scoped>
.main-content {
    margin-top: 90px;
}
</style>
