<template>
    <div class="trash">
        <filter-work @filterTask="filterTask"></filter-work>
        <div class="trash-clear me-5">
            <h5 class="text-end me-4 my-3 fs-6 text-danger">
                <span data-bs-toggle="modal" data-bs-target="#remind-cleanTrash"
                    >Dọn thùng rác</span
                >
            </h5>
        </div>
        <div class="task-delete row row-cols-4">
            <task-item
                class="col-3 mb-4 ms-4"
                v-for="(task, index) in trashTask"
                :key="index"
                :task="task"
                :sizeItem="sizeItem"
                data-bs-toggle="modal"
                data-bs-target="#editTask"
            ></task-item>
        </div>
        <remind-modal :id="`remind-cleanTrash`" @confirmAction="clearTrash">
            <template v-slot:remind-content>
                <p class="fs-5 fw-bold">
                    Bạn có chắc muốn dọn sạch thùng rác không?
                </p>
                <p class="text-center">
                    Toàn bộ nội dung đã xóa khỏi thùng rác sẽ không thể khôi
                    phục được nữa.
                </p>
            </template>
            <template v-slot:remind-confirm>Có</template>
        </remind-modal>
        <edit-task :typeEdit="`trash`"></edit-task>
    </div>
</template>

<script>
import FilterWork from "../components/GlobalComponents/Filter.vue";
import TaskItem from "../components/GlobalComponents/TaskItem.vue";
import RemindModal from "../components/GlobalComponents/RemindModal.vue";
import EditTask from "../components/GlobalComponents/EditTask.vue";
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";

export default {
    components: { FilterWork, TaskItem, RemindModal, EditTask },
    data() {
        return {
            sizeItem: {
                width: "23%",
            },
            filterData: {},
        };
    },
    computed: {
        ...mapGetters({
            account: "getAccount",
            tasks: "getTasks",
            trashTask: "getTrashTask",
        }),
    },
    watch: {
        filterData: {
            async handler(value) {
                // reset trash task store
                await this.$store.dispatch("getTasks", {
                    accountId: this.account._id,
                });

                // handler filter
                this.viewTaskType(value.taskType);
                this.viewTaskSort(value.sortTask);
                this.viewTaskSearch(value.searchText.trim());
            },
            deep: true,
        },
    },
    methods: {
        filterTask(value) {
            this.filterData = value;
        },
        viewTaskType(taskType) {
            if (taskType) {
                let viewTaskType = [];
                /* set trash task to view in interface.
                 4 types: danger==imp-hur, warning==imp-unhur
                          info = unimp-hur, success==unimp-unhur
                */
                switch (taskType) {
                    case "danger":
                        viewTaskType = this.trashTask.filter(
                            (task) => task.type === "imp-hur"
                        );
                        break;
                    case "warning":
                        viewTaskType = this.trashTask.filter(
                            (task) => task.type === "imp-unhur"
                        );
                        break;
                    case "info":
                        viewTaskType = this.trashTask.filter(
                            (task) => task.type === "unimp-hur"
                        );
                        break;
                    case "success":
                        viewTaskType = this.trashTask.filter(
                            (task) => task.type === "unimp-unhur"
                        );
                        break;
                }
                this.$store.commit("SET_TRASH_TASK", viewTaskType);
            }
        },
        viewTaskSort(sortTask) {
            /* sort trash task by timeCompleted
            sortTask =="", not sort.
            */
            if (sortTask) {
                this.trashTask.sort(
                    (taskA, taskB) =>
                        new Date(taskA.timeCompleted) -
                        new Date(taskB.timeCompleted)
                );
            }
        },

        viewTaskSearch(searchText) {
            //handler searching

            //convert object to string, save to array.
            let trashTaskString = this.trashTaskString();

            let searchTrashTask = this.searchTrashTask(
                trashTaskString,
                searchText
            );
            this.$store.commit("SET_TRASH_TASK", searchTrashTask);
        },

        trashTaskString() {
            return this.trashTask.map((task) => {
                const { title, description, timeCompleted } = task;
                const formatTimeCompleted = new Date(
                    `${timeCompleted}`
                ).toLocaleDateString("en-GB");
                return [
                    title.toLowerCase(),
                    description.toLowerCase(),
                    formatTimeCompleted === "Invalid Date"
                        ? " "
                        : formatTimeCompleted,
                ].join(" ");
            });
        },
        searchTrashTask(trashTaskString, searchText) {
            if (trashTaskString.length === 0) {
                return [];
            } else
                return this.trashTask.filter((task, index) => {
                    return trashTaskString[index].includes(
                        `${searchText.toLowerCase()}`
                    );
                });
        },
        async clearTrash() {
            await this.$store.dispatch("clearTrash", this.account._id);
            useToast().success("Đã dọn sạch thùng rác!");
        },
    },
    async created() {
        await this.$store.dispatch("getAccount");
        await this.$store.dispatch("getTasks", { accountId: this.account._id });
    },
};
</script>

<style scoped></style>
