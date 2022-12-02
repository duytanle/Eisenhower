import bcrypt from "bcrypt";
import Account from "../../Models/Account.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const authController = {
    register: async (req, res, next) => {
        const { username, password, retypePassword, name } = req.body;
        try {
            const account = await Account.findOne({ username });
            if (account) {
                return res.json({
                    status: false,
                    message: "Tên đăng nhập đã tồn tại!",
                });
            }
            if (password !== retypePassword) {
                return res.json({
                    status: false,
                    message: "Mật khẩu nhập lại không khớp!",
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);

                const account = Account.create({
                    name,
                    username,
                    password: hashed,
                });
                return res.json({
                    status: true,
                    result: account,
                    message: "Tạo tài khoản thành công!",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const account = await Account.findOne({ username });
            if (!account) {
                return res.json({
                    status: false,
                    message: "Tên đăng nhập không chính xác",
                });
            }
            const validPassword = await bcrypt.compare(
                password,
                account.password
            );
            if (!validPassword) {
                return res.json({
                    status: false,
                    message: "Mật khẩu đã nhập không chính xác!",
                });
            }
            if (account && validPassword) {
                const accessToken = jwt.sign(
                    {
                        id: account._id,
                    },
                    process.env.JWT_ACCESS_KEY
                );
                const { password, ...otherInfo } = account._doc;
                res.json({
                    status: true,
                    message: "Đăng nhập thành công!",
                    accessToken,
                    result: otherInfo,
                });
            }
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        res.json({
            status: true,
            message: "Đăng xuất thành công!",
        });
    },

    getAccount: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.json({ status: false, message: "Token không tồn tại!" });
        }

        try {
            const { id } = jwt.verify(token, process.env.JWT_ACCESS_KEY);
            const account = await Account.findOne({
                id,
            });

            if (account) {
                const { password, ...otherInfo } = account._doc;
                return res.json({
                    status: true,
                    message: "Lấy thông tin tài khoản thành công!",
                    result: otherInfo,
                });
            } else {
                return res.json({
                    status: false,
                    message: "Không thể lấy thông tin tài khoản!",
                });
            }
        } catch (error) {
            return res.json({ status: false, message: "Token không phù hợp!" });
        }
    },
};

export default authController;
