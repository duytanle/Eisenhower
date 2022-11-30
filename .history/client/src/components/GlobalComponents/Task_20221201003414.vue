<template>
    <div class="task col-12 mt-3 position-relative">
        <div class="row col-12 h-50 justify-content-between m-0">
            <div
                class="task-types task-type--danger col-6 rounded-2 p-0 h-100 overflow-hidden"
            >
                <div
                    class="task-type__title position-relative"
                    style="background-color: var(--danger-color)"
                >
                    <h5 class="text-center p-2 text-white m-0">
                        Quan trọng - Gấp
                    </h5>
                </div>
                <div
                    class="task__list p-3 row row-cols-1 row-cols-xl-2 m-0 justify-content-between"
                >
                    <task-item
                        v-for="(task, index) in imphur"
                        :key="index"
                        :task="task"
                        data-bs-toggle="modal"
                        data-bs-target="#editTask"
                        :sizeItem="sizeItem"
                    ></task-item>
                </div>
            </div>
            <div
                class="task-types task-type--warning col-6 rounded-2 p-0 h-100 overflow-hidden"
            >
                <div
                    class="task-type__title"
                    :style="`background-color: var(--warning-color);`"
                >
                    <h5 class="text-center p-2 text-white m-0">
                        Quan trọng - Không gấp
                    </h5>
                </div>
                <div
                    class="task__list p-3 row row-cols-1 row-cols-xl-2 m-0 justify-content-between"
                >
                    <task-item
                        v-for="(task, index) in impUnhur"
                        :key="index"
                        :task="task"
                        data-bs-toggle="modal"
                        data-bs-target="#editTask"
                        :sizeItem="sizeItem"
                    ></task-item>
                </div>
            </div>
            <div
                class="task-types task-type--info col-6 rounded-2 p-0 mt-3 h-100 overflow-hidden"
            >
                <div
                    class="task-type__title"
                    :style="`background-color: var(--info-color);`"
                >
                    <h5 class="text-center p-2 text-white m-0">
                        Không quan trọng - Gấp
                    </h5>
                </div>
                <div
                    class="task__list p-3 row row-cols-1 row-cols-xl-2 m-0 justify-content-between"
                >
                    <task-item
                        v-for="(task, index) in unimpHur"
                        :key="index"
                        :task="task"
                        data-bs-toggle="modal"
                        data-bs-target="#editTask"
                        :sizeItem="sizeItem"
                    ></task-item>
                </div>
            </div>
            <div
                class="task-types task-type--success col-6 rounded-2 p-0 mt-3 h-100 overflow-hidden"
            >
                <div
                    class="task-type__title"
                    :style="`background-color: var(--success-color)`"
                >
                    <h5 class="text-center p-2 text-white m-0">
                        Không quan trọng - Không gấp
                    </h5>
                </div>
                <div
                    class="task__list p-3 row row-cols-1 row-cols-xl-2 m-0 justify-content-between"
                >
                    <task-item
                        v-for="(task, index) in unImpUnhur"
                        :key="index"
                        :task="task"
                        data-bs-toggle="modal"
                        data-bs-target="#editTask"
                        :sizeItem="sizeItem"
                    ></task-item>
                </div>
            </div>
        </div>
        <slot name="createTaskModal"></slot>
        <edit-task :typeEdit="`task`"></edit-task>
    </div>
</template>

<script>
import TaskItem from "../GlobalComponents/TaskItem.vue";
import CreateTask from "../Home/CreateTask.vue";
import EditTask from "../GlobalComponents/EditTask.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            impHurTask: [],
            impUnhurTask: [],
            unimpHurTask: [],
            unimpUnhurTask: [],
            sizeItem: { width: "49%", height: "48%", marginRight: "0" },
        };
    },
    props: {
        typeTask: String,
        filterData: Object,
    },
    components: { TaskItem, CreateTask, EditTask },
    computed: {
        ...mapGetters({
            imphur: "getImpHurTask",
            impUnhur: "getImpUnhurTask",
            unimpHur: "getUnimpHurTask",
            unImpUnhur: "getUnimpUnhurTask",
            tasks: "getTasks",
            account: "getAccount",
        }),
    },
    watch: {
        filterData: {
            async handler(value) {
                await this.$store.dispatch("getTasks", {
                    accountId: this.account._id,
                    typeTask: this.typeTask,
                });
                this.viewTaskType(value.taskType);
                this.viewTaskSort(value.sortTask);
                this.viewTaskSearch(value.searchText.trim());
            },
            deep: true,
        },
    },
    methods: {
        viewTaskType(type) {
            //remove d-none all taskType
            let taskTypes = document.querySelectorAll(".task-types.d-none");
            taskTypes.forEach((taskType) => {
                taskType.classList.remove("d-none");
            });

            // For all taskTypes
            taskTypes = document.querySelectorAll(".task-types");
            taskTypes.forEach((taskType) => {
                //TaskType filter null
                if (!type) {
                    //Convert view 1 type to all type
                    taskType.classList.remove("col-8", "w-75", "h-75");
                    taskType.classList.add("col-6");
                    taskType.parentElement.classList.add(
                        "justify-content-between",
                        "h-50"
                    );
                    taskType.parentElement.classList.remove(
                        "justify-content-center",
                        "h-75"
                    );

                    //Show Button Add
                    const addButton = document.querySelector(
                        ".create-task .btn-add"
                    );
                    if (addButton) {
                        addButton.classList.remove("d-none");
                    }

                    // Edit view task list from  3col to 2col
                    taskType.children[1].classList.add("row-cols-2");
                    taskType.children[1].classList.remove("row-cols-3");
                    taskType.children[1].classList.add(
                        "justify-content-between"
                    );
                    taskType.children[1].classList.remove(
                        "justify-content-start"
                    );

                    //remove margin-right for all task item
                    const taskItems = document.querySelectorAll(
                        ".task__list .task-item"
                    );
                    taskItems.forEach((item) => {
                        item.style.marginRight = "0";
                    });

                    //Set height width for task item by props
                    this.sizeItem.height = "48%";
                    this.sizeItem.width = "49%";
                    this.sizeItem.marginRight = "0";

                    // taskType is task which the viewers doesn't want to see
                } else if (!taskType.classList.contains(`task-type--${type}`)) {
                    taskType.classList.add("d-none");

                    //taskType which the viewers want to views
                } else {
                    // edit taskType too view 1 taskType
                    taskType.parentElement.classList.remove(
                        "justify-content-between",
                        "h-50"
                    );
                    taskType.parentElement.classList.add(
                        "justify-content-center",
                        "h-75"
                    );

                    //Divide layout from 6col to 8col
                    taskType.classList.remove("col-6");
                    taskType.classList.add("col-8", "w-75");

                    // Set property for taskList
                    taskType.children[1].style.height = "90%";
                    taskType.children[1].classList.remove(
                        "justify-content-between"
                    );
                    taskType.children[1].classList.add("justify-content-start");
                    taskType.children[1].classList.remove(
                        "row-cols-xl-2",
                        "row-cols-1",
                        "row-cols-2"
                    );
                    taskType.children[1].classList.add("row-cols-3");

                    //Hidden add button
                    const addButton = document.querySelector(
                        ".create-task .btn-add"
                    );
                    if (addButton) {
                        addButton.classList.add("d-none");
                    }

                    //Edit margin taskItem
                    this.sizeItem.height = "32%";
                    this.sizeItem.width = "32%";
                    this.sizeItem.marginRight = "13px";
                }
            });
        },
        viewTaskSort(sortTask) {
            if (sortTask) {
                this.imphur.sort(
                    (taskA, taskB) =>
                        new Date(taskA.timeCompleted) -
                        new Date(taskB.timeCompleted)
                );
                this.impUnhur.sort(
                    (taskA, taskB) =>
                        new Date(taskA.timeCompleted) -
                        new Date(taskB.timeCompleted)
                );
                this.unimpHur.sort(
                    (taskA, taskB) =>
                        new Date(taskA.timeCompleted) -
                        new Date(taskB.timeCompleted)
                );
                this.unImpUnhur.sort(
                    (taskA, taskB) =>
                        new Date(taskA.timeCompleted) -
                        new Date(taskB.timeCompleted)
                );
            }
        },
        viewTaskSearch(searchText) {
            if (searchText) {
                let searchDanger = this.taskTypesString(this.imphur);
                let searchWarning = this.taskTypesString(this.impUnhur);
                let searchInfo = this.taskTypesString(this.unimpHur);
                let searchSuccess = this.taskTypesString(this.unImpUnhur);

                let taskDanger = this.searchTask(
                    this.imphur,
                    searchDanger,
                    searchText
                );
                let taskWarning = this.searchTask(
                    this.impUnhur,
                    searchWarning,
                    searchText
                );
                let taskInfo = this.searchTask(
                    this.unimpHur,
                    searchInfo,
                    searchText
                );
                let taskSuccess = this.searchTask(
                    this.unImpUnhur,
                    searchSuccess,
                    searchText
                );

                this.$store.commit("SET_TASK_TYPE", {
                    impHurTask: taskDanger,
                    impUnhurTask: taskWarning,
                    unimpHurTask: taskInfo,
                    unimpUnhurTask: taskSuccess,
                });
            }
        },
        taskTypesString(taskType) {
            return taskType.map((task) => {
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
        searchTask(taskType, arrayTaskType, searchText) {
            if (arrayTaskType.length === 0) {
                return [];
            } else
                return taskType.filter((task, index) => {
                    return arrayTaskType[index].includes(
                        `${searchText.toLowerCase()}`
                    );
                });
        },
    },

    async created() {
        await this.$store.dispatch("getAccount");
        await this.$store.dispatch("getTasks", {
            accountId: this.account._id,
            typeTask: this.typeTask,
        });
    },
};
</script>

<style scoped>
.task {
    height: 75vh;
}

.task-types {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    width: 49%;
}

.task__list {
    height: 85%;
    overflow-y: scroll;
}

.task-type__title {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.task-type--danger .task__list {
    border: 2px solid var(--danger-color);
}

.task-type--danger::-webkit-scrollbar-button {
    display: none;
}
.task-type--warning .task__list {
    border: 2px solid var(--warning-color);
}

.task-type--info .task__list {
    border: 2px solid var(--info-color);
}
.task-type--success .task__list {
    border: 2px solid var(--success-color);
}

.task__list > * {
    margin-bottom: 10px;
}
</style>
