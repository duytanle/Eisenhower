<template>
    <div
        class="task-item p-1 rounded-2"
        @click="openEditTask"
        :style="cssProps"
    >
        <p class="item-title fw-bold mb-1">{{ formatTitle }}</p>
        <p class="item-desc m-0" style="font-size: 0.9rem">
            {{ formatDescription }}
        </p>
        <p style="font-size: 0.9rem" class="p-0 m-0">
            <span class="time-completed">Thời hạn hoàn thành:</span>
            {{ formatDate }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        task: Object,
        sizeItem: Object,
    },
    computed: {
        cssProps() {
            return {
                "--height": this.sizeItem.height,
                "--width": this.sizeItem.width,
                "--marginRight": this.sizeItem.marginRight,
            };
        },
        formatTitle() {
            if (this.task.title) {
                return this.task.title;
            } else {
                return "Không có tiêu đề";
            }
        },
        formatDescription() {
            if (this.task.description) {
                return this.task.description;
            } else {
                return "Không có mô tả";
            }
        },
        formatDate() {
            if (this.task.timeCompleted) {
                return new Date(
                    Date.parse(this.task.timeCompleted)
                ).toLocaleDateString("en-GB");
            } else {
                return "Chưa có !";
            }
        },
    },
    methods: {
        openEditTask() {
            this.$store.commit("SET_EDIT_TASK", JSON.stringify(this.task));
        },
    },
};
</script>

<style scoped>
.task-item {
    border: 1px solid rgb(174, 172, 172);
    height: var(--height) !important;
    width: var(--width) !important;
    margin-right: var(--marginRight) !important;
}
.task-item:hover {
    box-shadow: rgba(57, 57, 57, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
}

.item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.item-desc {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
}
.time-completed {
    color: var(--danger-color);
}
</style>
