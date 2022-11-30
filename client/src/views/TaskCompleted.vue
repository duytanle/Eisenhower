<template>
    <div class="task-completed">
        <filter-work @filterTask="filterTask"></filter-work>
        <task :typeTask="`completed`" :filterData="filterData"></task>
    </div>
</template>

<script>
import FilterWork from "../components/GlobalComponents/Filter.vue";
import Task from "../components/GlobalComponents/Task.vue";
export default {
    components: { FilterWork, Task },
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

<style scoped></style>
