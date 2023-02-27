import Joi from "joi";

const joiValidation = (schema, req, res, next) => {
  try {
    //compare
    const { error } = schema.validate(req.body);

    error
      ? res.json({
        status: "error",
        message: error.message,
      })
      : next();
  } catch (error) {
    next(error);
  }
};

// ================admin validation
export const newAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    address: Joi.string().allow("", null),
    email: Joi.string().email({ minDomainSegments: 2 }),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().allow("", null),
  });

  joiValidation(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    emailVerificationCode: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};

//login
export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};

//login
export const passResetValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
    otp: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};

// ================category validation

export const updatCatValidation = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.string().required(),
  });

  joiValidation(schema, req, res, next);
};
