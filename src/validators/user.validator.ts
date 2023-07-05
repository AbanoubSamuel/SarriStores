import Joi from "joi";
import {IUser} from "../models/user.model";
// a7a ya abdo

export const createUserSchema = Joi.object<IUser>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .required()
        .min(9)
        .max(50)
        .email(),
    password: Joi.string()
        .required()
        .min(5)
        .max(50),
    phone: Joi.string()
        .required()
        .min(7)
        .max(15)
        .pattern(/^[0-9]+$/),
});

export const updateUserSchema = Joi.object<IUser>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .email()
        .min(9)
        .max(50),
    password: Joi.string()
        .min(5)
        .max(50),
    phone: Joi.string()
        .min(7)
        .max(15)
        .pattern(/^[0-9]+$/)
});

export const loginUserSchema = Joi.object<IUser>({
    email: Joi.string()
        .required()
        .email()
        .min(9)
        .max(50),
    password: Joi.string()
        .required()
        .min(5)
        .max(50),
});

