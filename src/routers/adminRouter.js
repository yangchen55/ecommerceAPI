import express from "express";
import {
    emailVerificationValidation,
    loginValidation,
    newAdminValidation,
} from "../middlewares/joiMiddleware.js";
import { createNewAdmin, findUser, updateAdmin } from "../models/admin/AdminModel.js";
import { comparePassword, hashPassword } from "../util/bcrypt.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
    emailVerifiedNotification,
    newAccountEmailVerificationEmail,
} from "../util/nodemailer.js";

//admin user loging
router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body


        // find user by email 
        const user = await findUser({ email })
        if (user?._id) {
            const isPassMatch = await comparePassword(password, user.password)
            if (isPassMatch) {
                user.password = undefined;
                user.__v = undefined;
                res.json({
                    status: "success",
                    message: " login  successfully",
                    user,
                });
                return


            }




        }
        res.json({
            status: "error",
            message: "illegal login",
        });

        // check if plain password and hashPassword match 
        // login successfull 

    } catch (error) {
        next(error);
    }
});

// admin user registration
router.post("/register", newAdminValidation, async (req, res, next) => {
    try {
        req.body.password = hashPassword(req.body.password);
        req.body.emailVerificationCode = uuidv4();
        const result = await createNewAdmin(req.body);
        if (result?._id) {
            const uniqueLink = `${process.env.FRONTEND_ROOT_URL}/verify?c=${result.emailVerificationCode}&email=${result.email}`;
            newAccountEmailVerificationEmail(uniqueLink, result);

            res.json({
                status: "success",
                message:
                    `"We have send 
                    a verification email. Please check your email, inclucing junk folder, and follow the instruction to verify your account.", <a href="${uniqueLink}">click here</a>`,
            });

            return;
        }

        res.json({
            status: "error",
            message: "Error, Unable to create a new user has been registered",
        });
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.message =
                "There is already account exist associated with this email";
            error.errorCode = 200;
        }
        next(error);
    }
});

// admin user email verification
router.post("/verify", emailVerificationValidation, async (req, res, next) => {
    try {
        // chek if the combination of email and code exist in db if so set the status active and code to "" in the db, also update is email verified to true

        const obj = {
            status: "active",
            isEmailVerified: true,
            emailVerificationCode: "",
        };

        const user = await updateAdmin(req.body, obj);

        if (user?._id) {
            //send email notification
            emailVerifiedNotification(user);

            res.json({
                status: "success",
                message: "Your account has been verified. You may login now",
            });

            return;
        }

        res.json({
            status: "error",
            message: "The link is invalid or expired.",
        });
    } catch (error) {
        next(error);
    }
});





export default router;