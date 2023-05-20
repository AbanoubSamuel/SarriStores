import Joi from "joi";
import { IUser } from "../models/user";
// a7a ya abdo

const createUserSchema = Joi.object<IUser>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .min(9)
        .max(100)
        .email()
        .required(),
    password: Joi.string()
        .min(5)
        .max(50)
        .required(),
    phone: Joi.string()
        .required()
        .min(7)
        .max(15)
        .pattern(/^[0-9]+$/),
    role: Joi.string()
});

const validateUserPut = (user: any) =>
{
    const schema = Joi.object<IUser>({
        email: Joi.string()
            .required()
            .email()
            .min(9)
            .max(50),
        password: Joi.string()
            .min(5)
            .max(50),
        phone: Joi.string()
            .required()
            .min(7)
            .max(15)
            .pattern(/^[0-9]+$/)
    });

    return schema.validate(user);
};

export { createUserSchema, validateUserPut };
