import express from "express";
import userController from "../Controllers/UserController/userController.js";

const router = express.Router();

router.post("/create-task", userController.createTask);

router.get("/get-tasks", userController.getTask);

router.patch("/update-task", userController.updateTask);

router.delete("/delete-task", userController.deleteTask);
router.delete("/clear-trash", userController.clearTrash);

export default router;
