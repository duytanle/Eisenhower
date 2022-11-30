import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const accessToken = authHeader && authHeader.split(" ")[1];
        jwt.verify(
            accessToken,
            process.env.JWT_ACCESS_KEY,
            (error, account) => {
                if (error) {
                    res.status(403).json({
                        status: false,
                        message: "Token không phù hợp",
                    });
                }
                req.account = account;
                next();
            }
        );
    } else {
        return res.status(401).json({
            status: false,
            message: "Bạn không có quyền truy cập",
        });
    }
};

export default verifyToken;
