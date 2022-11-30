<template>
    <!-- Modal -->
    <div
        class="modal fade"
        :id="`${id}`"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="remindModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header pb-0" style="border-bottom: none">
                    <h1 class="modal-title fs-5" id="remindModalLabel">
                        <slot name="remind-title"></slot>
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div
                    class="modal-body d-flex flex-column align-items-center justify-content-center pt-0"
                >
                    <i
                        class="bx bx-error"
                        style="color: #eed923; font-size: 80px"
                    ></i>
                    <slot name="remind-content"></slot>
                </div>
                <div
                    class="modal-footer d-flex justify-content-evenly"
                    style="border-top: none"
                >
                    <button
                        type="button"
                        class="btn-reject rounded-2 fw-bold"
                        data-bs-dismiss="modal"
                    >
                        Không
                    </button>
                    <button
                        type="button"
                        class="btn-confirm rounded-2 fw-bold"
                        @click="confirmAction"
                        data-bs-dismiss="modal"
                    >
                        <slot name="remind-confirm"></slot>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { id: String },
    methods: {
        confirmAction() {
            this.$emit("confirmAction");
        },
    },
};
</script>

<style scoped>
.modal-content {
    border-left: 10px solid #eed923;
}

.btn-confirm,
.btn-reject {
    min-width: 80px;
}

.btn-confirm {
    background-color: #eed923;
    border-color: #eed923;
    color: white;
}

.btn-reject {
    background-color: white;
    border-color: #eed923;
    color: #eed923;
}
.btn-reject:hover,
.btn-confirm:hover {
    box-shadow: rgba(7, 7, 7, 0.374) 0px 2px 8px 0px;
}
</style>
