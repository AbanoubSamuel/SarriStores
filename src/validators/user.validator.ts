import Joi from "joi";
import { IUser } from "../models/user";
// a7a ya abdo

    const createUserSchema = Joi.object<IUser>({
        username: Joi.string().min(9).max(255).required(),
        email: Joi.string().min(9).max(255).email().required(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.string()
            .min(7)
            .max(15)
            .pattern(/^[0-9]+$/)
            .required(),
        role: Joi.string()
    });

const validateUserPut = (user: any) =>
{
    const schema = Joi.object<IUser>({
        username: Joi.string().min(9).max(255).required(),
        email: Joi.string().min(9).max(255).email(),
        password: Joi.string().min(5).max(255),
        phone: Joi.string()
            .min(7)
            .max(15)
            .pattern(/^[0-9]+$/),
    });

    return schema.validate(user);
};

export { createUserSchema, validateUserPut };
