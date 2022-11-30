<script>
import FilterWork from "../components/GlobalComponents/Filter.vue";
import task from "../components/GlobalComponents/Task.vue";
import CreateTask from "../components/Home/CreateTask.vue";

export default {
    components: { FilterWork, task, CreateTask },
    data() {
        return {
            filterData: {},
        };
    },
    methods: {
        filterTask(value) {
            this.filterData = value;
        },
    },
};
</script>

<template>
    <div class="home-page">
        <filter-work @filterTask="filterTask"></filter-work>
        <task :typeTask="`non-completed`" :filterData="filterData">
            <template v-slot:createTaskModal>
                <create-task></create-task>
            </template>
        </task>
    </div>
</template>

<style scoped></style>
