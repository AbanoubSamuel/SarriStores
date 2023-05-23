import Joi from 'joi';
import {IUser} from '../models/user.model';
// a7a ya abdo

export const createUserSchema = Joi.object<IUser>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .min(9)
        .max(50)
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

export const updateUserSchecma = Joi.object<IUser>({
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


export const loginSchema = Joi.object<IUser>({
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

