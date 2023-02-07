import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
    try {
        console.log(req.body, "joi")

        // condition 
        const schema = Joi.object(
            {
                "address": Joi.string().allow("", null),
                "confirmPassword": Joi.string().required(),
                "email": Joi.string().email({ minDomainSegments: 2 }),
                "fname": Joi.string().required(),
                "lname": Joi.string().required(),
                "password": Joi.string().required(),
                "phoneno": Joi.string().allow("", null),
            })
        // compare 
        const { values, error } = schema.validate(req.body)
        error
            ?
            res.json({
                status: "error",
                message: error.message
            })
            : next()


    } catch (error) {
        next(error)

    }
}