import axios from "axios";
import config from "../config/index.js";
const userModule = {
    state: {
        tasks: [],
        impHurTask: [],
        impUnhurTask: [],
        unimpHurTask: [],
        unimpUnhurTask: [],
        trashTask: [],
        editTask: {},
    },
    getters: {
        getTasks(state) {
            return state.tasks;
        },
        getTrashTask(state) {
            return state.trashTask;
        },
        getImpHurTask(state) {
            return state.impHurTask;
        },
        getImpUnhurTask(state) {
            return state.impUnhurTask;
        },
        getUnimpHurTask(state) {
            return state.unimpHurTask;
        },
        getUnimpUnhurTask(state) {
            return state.unimpUnhurTask;
        },
        getEditTask(state) {
            return state.editTask;
        },
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_TASK_TYPE(state, taskTypes) {
            state.impHurTask = taskTypes.impHurTask;
            state.impUnhurTask = taskTypes.impUnhurTask;
            state.unimpHurTask = taskTypes.unimpHurTask;
            state.unimpUnhurTask = taskTypes.unimpUnhurTask;
        },
        RESET_TASK_TYPE(state) {
            state.impHurTask = [];
            state.impUnhurTask = [];
            state.unimpHurTask = [];
            state.unimpUnhurTask = [];
        },
        SET_TRASH_TASK(state, trashTask) {
            state.trashTask = trashTask;
        },
        RESTORE_TASK(state, trashTask) {
            const index = state.trashTask.findIndex(
                (item) => item._id === trashTask._id
            );
            state.trashTask.splice(index, 1);
        },
        ADD_TRASH_TASK(state, task) {
            state.trashTask.unshift(task);
        },
        ADD_TASK(state, task) {
            switch (task.type) {
                case "imp-hur":
                    state.impHurTask.unshift(task);
                    break;
                case "imp-unhur":
                    state.impUnhurTask.unshift(task);
                    break;
                case "unimp-hur":
                    state.unimpHurTask.unshift(task);
                    break;
                case "unimp-unhur":
                    state.unimpUnhurTask.unshift(task);
                    break;
            }
        },
        DELETE_TASK(state, task) {
            let index;
            switch (task.type) {
                case "imp-hur":
                    index = state.impHurTask.findIndex(
                        (item) => item._id === task._id
                    );
                    state.impHurTask.splice(index, 1);
                    break;

                case "imp-unhur":
                    index = state.impUnhurTask.findIndex(
                        (item) => item._id === task._id
                    );
                    state.impUnhurTask.splice(index, 1);
                    break;

                case "unimp-hur":
                    index = state.unimpHurTask.findIndex(
                        (item) => item._id === task._id
                    );
                    state.unimpHurTask.splice(index, 1);
                    break;

                case "unimp-unhur":
                    index = state.unimpUnhurTask.findIndex(
                        (item) => item._id === task._id
                    );
                    state.unimpUnhurTask.splice(index, 1);
                    break;
            }
        },
        SET_EDIT_TASK(state, editTask) {
            state.editTask = JSON.parse(editTask);
            if (state.editTask.timeCompleted)
                state.editTask.timeCompleted = new Date(
                    state.editTask.timeCompleted
                ).toLocaleDateString("fr-CA");
        },
    },
    actions: {
        async getTasks({ commit }, infoGetTask) {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${config.domain}/api/get-tasks`, {
                headers: {
                    Authorization: "Bearer  " + token,
                },
                params: { accountId: infoGetTask.accountId },
            });

            if (res.data.status) {
                //Set state tasks
                const tasks = res.data.result;
                commit("SET_TASKS", tasks);

                //Set state trash task
                const trashTask = tasks.filter(
                    (task) => task.removeTrash === true
                );
                commit("SET_TRASH_TASK", trashTask);

                //Set taskType
                if (infoGetTask.typeTask) {
                    commit("RESET_TASK_TYPE");

                    //UI home
                    if (infoGetTask.typeTask === "non-completed") {
                        tasks.forEach((task) => {
                            if (!task.statusCompleted && !task.removeTrash)
                                commit("ADD_TASK", task);
                        });

                        //UI task completed
                    } else {
                        tasks.forEach((task) => {
                            if (task.statusCompleted && !task.removeTrash)
                                commit("ADD_TASK", task);
                        });
                    }
                }
            }
        },

        async updateTask({ commit }, infoUpdate) {
            const token = localStorage.getItem("token");
            const task = infoUpdate.task;
            console.log(task);

            const res = await axios.patch(
                `${config.domain}/api/update-task`,
                {
                    task,
                    accountId: infoUpdate.accountId,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            const storeTask = res.data.storeTask;

            //Remove Type of Task
            if (
                !task.statusCompleted &&
                !storeTask.statusCompleted &&
                !task.removeTrash
            ) {
                commit("DELETE_TASK", storeTask);
                commit("ADD_TASK", res.data.result);

                //Change completed status
            } else if (
                !task.statusCompleted &&
                storeTask.statusCompleted &&
                !task.removeTrash
            ) {
                commit("DELETE_TASK", storeTask);

                //update in task completed
            } else if (
                task.statusCompleted &&
                storeTask.statusCompleted &&
                !task.removeTrash
            ) {
                commit("DELETE_TASK", storeTask);
                commit("ADD_TASK", res.data.result);

                //move in task completed
            } else if (task.statusCompleted && !task.removeTrash) {
                commit("DELETE_TASK", storeTask);
            } else if (task.removeTrash) {
                commit("DELETE_TASK", task);
                commit("ADD_TRASH_TASK", task);
            }
        },

        async deleteTask({ commit }, infoDelete) {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`${config.domain}/api/delete-task`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                params: {
                    accountId: infoDelete.accountId,
                    taskId: infoDelete.taskId,
                },
            });
            commit("DELETE_TASK", res.data.result);
        },

        async clearTrash({ commit }, accountId) {
            const token = localStorage.getItem("token");
            await axios.delete(`${config.domain}/api/clear-trash`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                params: {
                    accountId,
                },
            });
            commit("SET_TRASH_TASK", []);
        },
    },
};
export default userModule;
