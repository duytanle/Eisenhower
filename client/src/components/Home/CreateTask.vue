<template>
    <div class="create-task">
        <button
            type="button"
            class="btn-add rounded-circle d-flex justify-content-center align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#createTask"
        >
            <i class="bx bx-plus fs-2" style="color: #ffffff"></i>
        </button>
        <div
            class="modal fade"
            id="createTask"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="createTaskLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1
                            class="modal-title fs-5 text-white"
                            id="createTaskLabel"
                        >
                            Thêm mới công việc
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
                            class="create-task-content d-flex flex-column justify-content-center align-items-center animate__animated animate__fadeIn"
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
                                            v-model="task.title"
                                        />
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
                                            v-model="task.description"
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
                                            v-model="task.type"
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
                                            v-model="task.timeCompleted"
                                        />
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
                            class="btn btn-primary"
                            :data-bs-dismiss="
                                checkSuccessRegister ? `modal` : ``
                            "
                            @click="createTask"
                        >
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import config from "../../config/index.js";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            task: {
                title: "",
                description: "",
                type: "",
                timeCompleted: "",
            },
        };
    },
    computed: {
        ...mapGetters({ account: "getAccount" }),
        checkSuccessRegister() {
            return (
                (this.task.description.trim() || this.task.title.trim()) &&
                this.task.type
            );
        },
    },
    methods: {
        resetInfoCreate() {
            this.task.title = "";
            this.task.description = "";
            this.task.timeCompleted = "";
            this.task.type = "";
        },
        async createTask() {
            if (!this.task.description.trim() && !this.task.title.trim())
                useToast().error("Phải thêm tiêu đề hoặc mô tả!");
            else if (!this.task.type) {
                useToast().error("Vui lòng chọn loại công việc!");
            } else {
                const token = localStorage.getItem("token");

                const res = await axios.post(
                    `${config.domain}/api/create-task`,
                    {
                        accountId: this.account._id,
                        title: this.task.title,
                        description: this.task.description,
                        type: this.task.type,
                        timeCompleted: this.task.timeCompleted,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                if (res.data.status) {
                    useToast().success(res.data.message);
                    this.$store.commit("ADD_TASK", res.data.result);
                    this.resetInfoCreate();
                } else {
                    useToast().error(res.data.message);
                }
            }
        },
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

<style scoped>
.btn-add {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    height: 50px;
    width: 50px;
    background-color: #38e54d;
    outline: none;
    border: none;
}

.btn-add:hover {
    background-color: #13b225;
}

.btn-add:focus {
    outline: none;
    border: none;
}

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
.create-task-content .input-div {
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

.input-div.date > div > h5 {
    top: -5px;
    font-size: 15px;
}

.input-div.task-type > div > h5 {
    top: -20px;
    font-size: 15px;
}

.input-div.focus > div > h5 {
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

.text-danger {
    margin-top: -12px;
}
</style>
