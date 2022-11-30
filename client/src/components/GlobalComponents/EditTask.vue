<template>
    <div class="edit-task">
        <div
            class="modal fade"
            id="editTask"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="editTaskLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1
                            class="modal-title fs-5 text-white"
                            id="editTaskLabel"
                        >
                            Chỉnh sửa công việc
                        </h1>
                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div
                            class="edit-task-content d-flex flex-column justify-content-center align-items-center animate__animated animate__fadeIn"
                        >
                            <form action="" class="w-100 p-3">
                                <div
                                    class="input-div one row position-relative py-1 mb-4 mt-0"
                                >
                                    <div class="div col-12 position-relative">
                                        <h5>Tiêu đề</h5>
                                        <input
                                            type="text"
                                            class="input position-absolute top-0 start-0 w-100"
                                            v-model="editTask.title"
                                            :disabled="typeEdit === `trash`"
                                        />
                                        <!-- disable input when the interface is a views trash page -->
                                    </div>
                                </div>
                                <div
                                    class="input-div desc row position-relative py-1 mb-4"
                                >
                                    <div class="div col-12 position-relative">
                                        <h5>Mô tả</h5>
                                        <textarea
                                            type="text"
                                            class="input position-absolute top-0 start-0 w-100"
                                            :disabled="typeEdit === `trash`"
                                            v-model="editTask.description"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="input-div task-type row position-relative pt-1 pb-3 mb-4"
                                >
                                    <div
                                        class="div col-12 position-relative mt-4"
                                    >
                                        <h5>Loại công việc</h5>
                                        <select
                                            class="form-select input"
                                            aria-label="Default select example"
                                            :disabled="typeEdit === `trash`"
                                            v-model="editTask.type"
                                        >
                                            <option selected value="">
                                                Chọn loại công việc
                                            </option>
                                            <option value="imp-hur">
                                                Quan trọng - Gấp
                                            </option>
                                            <option value="imp-unhur">
                                                Quan trọng - Không gấp
                                            </option>
                                            <option value="unimp-hur">
                                                Không quan trọng - Gấp
                                            </option>
                                            <option value="unimp-unhur">
                                                Không quan trọng - Không gấp
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    class="input-div date row position-relative py-1 mb-4"
                                >
                                    <div
                                        class="div col-12 position-relative mt-4"
                                    >
                                        <h5>Thời hạn hoàn thành</h5>
                                        <input
                                            type="date"
                                            class="input position-absolute top-0 start-0 w-100"
                                            v-model="editTask.timeCompleted"
                                            :disabled="typeEdit === `trash`"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="input-div workStatus row position-relative mt-4 pb-1"
                                >
                                    <h5 style="font-size: 1rem">
                                        Trạng thái hoàn thành công việc
                                    </h5>
                                    <div class="col-6">
                                        <input
                                            class="input"
                                            type="radio"
                                            name="workStatus"
                                            id="workStatusNo"
                                            :checked="!editTask.statusCompleted"
                                            value="no"
                                            :disabled="typeEdit === `trash`"
                                        />
                                        <label
                                            class="form-check-label ms-2"
                                            for="workStatusNo"
                                        >
                                            Chưa hoàn thành
                                        </label>
                                    </div>
                                    <div
                                        class="col-6 d-flex align-items-center justify-content-end"
                                    >
                                        <input
                                            class="input"
                                            type="radio"
                                            name="workStatus"
                                            id="workStatusYes"
                                            value="yes"
                                            :checked="editTask.statusCompleted"
                                            :disabled="typeEdit === `trash`"
                                        />
                                        <label
                                            class="form-check-label ms-2"
                                            for="workStatusYes"
                                        >
                                            Đã hoàn thành
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-evenly">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Đóng
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="deleteTask"
                            data-bs-dismiss="modal"
                            v-if="typeEdit === `task`"
                        >
                            Xóa công việc
                        </button>

                        <button
                            type="button"
                            class="btn btn-primary"
                            :data-bs-dismiss="checkValidValue()"
                            @click="saveData"
                            v-if="typeEdit === `task`"
                        >
                            Lưu thay đổi
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="restoreTask"
                            v-if="typeEdit === `trash`"
                        >
                            Khôi phục công việc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useToast } from "vue-toastification";
export default {
    props: {
        typeEdit: String,
    },
    computed: {
        ...mapGetters({
            editTask: "getEditTask",
            account: "getAccount",
            tasks: "getTasks",
            trashTask: "getTrashTask",
        }),
    },
    methods: {
        //check task edit value to show button save
        checkValidValue() {
            if (
                (this.editTask.description || this.editTask.title) &&
                this.editTask.type
            )
                return "modal";
            else {
                return " ";
            }
        },

        //save data after edit (click event)
        async saveData() {
            if (
                !this.editTask.description.trim() &&
                !this.editTask.title.trim()
            ) {
                useToast().error("Phải thêm tiêu đề hoặc mô tả!");
            } else if (!this.editTask.type) {
                useToast().error("Vui lòng chọn loại công việc!");
            } else {
                const workStatus =
                    document.querySelector('input[name="workStatus"]:checked')
                        .value === "no"
                        ? false
                        : true;

                this.editTask.statusCompleted = workStatus;

                await this.$store.dispatch("updateTask", {
                    task: this.editTask,
                    accountId: this.account._id,
                });
                useToast().success("Cập nhật thông tin thành công!");
            }
        },

        //remove one task to trash
        async deleteTask() {
            this.editTask.removeTrash = true;
            await this.$store.dispatch("updateTask", {
                accountId: this.account._id,
                task: this.editTask,
            });
            useToast().success("Đã chuyển công việc đến thùng rác!");
        },

        //restore task from trash
        async restoreTask() {
            console.log("before restore: ", this.tasks);
            this.editTask.removeTrash = false;
            await this.$store.dispatch("updateTask", {
                accountId: this.account._id,
                task: this.editTask,
            });
            this.$store.commit("RESTORE_TASK", this.editTask);
            useToast().success("Đã khôi phục công việc!");
            console.log("after restore", this.tasks);
        },
    },

    mounted() {
        const editTask = document.querySelector(".edit-task");
        const inputs = editTask.querySelectorAll(".input");

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

<style scoped>
.modal-header {
    background-image: linear-gradient(
        to bottom right,
        var(--secondary-color),
        var(--primary-color)
    );
}
.input-div.desc {
    height: 80px;
}
textarea {
    height: 70px;
}
.edit-task-content .input-div {
    border-bottom: 2px solid #d9d9d9;
}

.input-div > div {
    height: 30px;
}

.input-div > div > h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(0, 0, 0);
    font-size: 1rem;
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

.input-div.date > div > h5,
.input-div.workStatus > div > h5 {
    top: -5px;
    font-size: 15px;
}

.input-div.task-type > div > h5 {
    top: -20px;
    font-size: 15px;
}

.input-div > div > h5 {
    top: -5px;
    font-size: 15px;
}
.input-div.task-type.focus > div > h5 {
    top: -20px;
    font-size: 15px;
}
.input-div > div > textarea,
.input-div > div > input {
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    line-height: 1.3;
    color: #555;
}

.btn {
    min-width: 80px;
}
</style>
