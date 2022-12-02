import express from "express";
import authController from "../Controllers/AuthController/authController.js";
import verifyToken from "../Middleware/verifyToken.js";
const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get("/get-account", authController.getAccount);
export default router;
