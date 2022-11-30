import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./Database/connectDB.js";
import userRouter from "./Routers/userRouter.js";
import authRouter from "./Routers/authRouter.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/auth", authRouter);
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
