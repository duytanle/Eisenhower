import Task from "../../Models/Task.js";
import { ObjectId } from "mongodb";
import { response } from "express";
const userController = {
    createTask: async (req, res, next) => {
        const { accountId, title, description, type, timeCompleted } = req.body;
        try {
            const task = await Task.create({
                accountId,
                title,
                description,
                type,
                timeCompleted,
            });
            if (task) {
                return res.json({
                    status: true,
                    message: "Tạo công việc thành công!",
                    result: task,
                });
            } else {
                return res.json({
                    status: false,
                    message: "Không thể tạo công việc!",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    getTask: async (req, res, next) => {
        const { accountId } = req.query;
        try {
            const tasks = await Task.find({ accountId: ObjectId(accountId) });
            if (tasks) {
                return res.json({
                    status: true,
                    message: "Lấy danh sách công việc thành công!",
                    result: tasks,
                });
            } else {
                return res.json({
                    status: false,
                    message: "Không tìm thấy danh sách công việc!",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    updateTask: async (req, res, next) => {
        const { task, accountId } = req.body;
        try {
            const findTask = await Task.findOne({
                _id: ObjectId(task._id),
                accountId: ObjectId(accountId),
            });

            if (findTask) {
                const updateTask = await Task.findOneAndUpdate(
                    {
                        _id: ObjectId(task._id),
                        accountId: ObjectId(accountId),
                    },
                    {
                        type: task.type,
                        title: task.title,
                        description: task.description,
                        statusCompleted: task.statusCompleted,
                        timeCompleted: task.timeCompleted,
                        removeTrash: task.removeTrash,
                    },
                    {
                        new: true,
                    }
                );
                return res.json({
                    status: true,
                    message: "Cập nhật công việc thành công!",
                    storeTask: findTask,
                    result: updateTask,
                });
            } else {
                return res.json({
                    status: false,
                    message: "Không tìm thấy công việc để cập nhật!",
                });
            }
        } catch (error) {
            next(error);
        }
    },
    deleteTask: async (req, res, next) => {
        const { accountId, taskId } = req.query;
        try {
            const result = await Task.findOneAndDelete({
                accountId: ObjectId(accountId),
                _id: ObjectId(taskId),
            });
            return res.json({
                status: true,
                message: "Công việc đã chuyển đến thùng rác",
                result,
            });
        } catch (error) {
            next(error);
        }
    },
    clearTrash: async (req, res, next) => {
        const { accountId } = req.query;
        try {
            await Task.deleteMany({
                accountId: ObjectId(accountId),
                removeTrash: true,
            });
            return res.json({
                status: true,
                message: "Đã dọn sạch thùng rác!",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
