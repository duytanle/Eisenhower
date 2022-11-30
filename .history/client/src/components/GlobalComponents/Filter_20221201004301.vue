<template>
    <div class="filter pb-3 border-bottom align-items-center ms-1">
        <form
            action=""
            class="col-12 row m-0 align-items-center justify-content-lg-center"
        >
            <div class="sort__type col-4 pe-0">
                <label for="type" class="me-4">Công việc: </label>
                <select
                    class="form-select w-auto d-inline"
                    aria-label="Default select example"
                    id="type"
                    v-model="filterData.taskType"
                >
                    <option selected value="">Tất cả</option>
                    <option value="danger">Quan trọng - Gấp</option>
                    <option value="warning">Quan trọng - Không gấp</option>
                    <option value="info">Không quan trọng - Gấp</option>
                    <option value="success">
                        Không quan trọng - Không gấp
                    </option>
                </select>
            </div>
            <div class="sort__date col-3 mb-0">
                <label for="date" class="me-3"> Sắp xếp: </label>
                <select
                    class="form-select w-auto d-inline"
                    aria-label="Default select example"
                    id="date"
                    v-model="filterData.sortTask"
                >
                    <option selected value="">Mặc định</option>
                    <option value="timeCompleted">
                        Theo thời hạn hoàn thành
                    </option>
                </select>
            </div>
            <div
                class="search col-4 d-flex align-items-center mt-0 rounded-2 border"
            >
                <i class="bx bx-search"></i>
                <input
                    type="text"
                    placeholder="Tìm kiếm công việc"
                    class="flex-grow-1"
                    v-model="filterData.searchText"
                />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filterData: {
                taskType: "",
                sortTask: "",
                searchText: "",
            },
        };
    },
    watch: {
        filterData: {
            handler(newValue) {
                this.$emit("filterTask", newValue);
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
input[type="text"] {
    padding: 7px;
}
input[type="text"]:focus {
    border-color: transparent;
    outline: 0;
}

.search input[type="text"]:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
}
.search input {
    border: none;
}
</style>
