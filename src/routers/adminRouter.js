import express from 'express'
import { newAdminValidation } from '../middlewares/joiMiddleware.js';
import { createNewAdmin } from '../models/admin/adminModel.js';
import { hashPassword } from '../util/bcrypt.js';
import { v4 as uuidv4 } from 'uuid';
import { newAccountEmailVerificationEmail } from '../util/nodemailer.js';
const router = express.Router()


//user registration
router.post("/", async (req, res, next) => {
    try {
        res.json({
            status: "success",
            message: "todo login"
        });
    } catch (error) {
        next(error)
    }
}
)


// admin user registration
router.post("/register", newAdminValidation, async (req, res, next) => {
    try {
        console.log(req.body)
        req.body.password = hashPassword(req.body.password)
        // whta is ethis 
        req.body.emailVerficationCode = uuidv4();
        const result = await createNewAdmin(req.body)


        if (result?._id) {
            const uniqueLink = `http://localhost:3000/verify?c=${result.emailVerficationCode}&email =${result.email
                }`
            newAccountEmailVerificationEmail(uniqueLink, result)

            res.json({
                status: "success",
                message: "new user registerred"
            })

            return;

        }


        res.json({
            status: "error kkk",
            message: "unable to "
        })

    } catch (error) {
        if (error.message.includes("E11000 duplicate")) {
            error.message = "email already registered";
            error.errorCode = 200
        }
        next(error)

    }
}

)

export default router