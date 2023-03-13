import { findUser } from "../models/admin/AdminModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const isAuth = async (req, res, next) => {
    try {
        // get jwt from header 
        const { authorization } = req.headers;

        const decoded = verifyAccessJWT(authorization)
        console.log(decoded)
        // check if validation and in debugger
        if (decoded?.email) {
            const user = await findUser({
                email: decoded.email
            });
            if (user?._id) {
                req.userInfo = user;
                return next()

            }
        }

        res.status(403).json({
            status: "error",
            message: "authorized"
        })
    } catch (error) {
        next(error)

    }
}