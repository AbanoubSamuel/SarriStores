import Joi from "joi";
import {IQuery} from "../models/query.model";


export const createQuerySchema = Joi.object<IQuery>({
    company: Joi.string()
        .required()
        .min(3)
        .max(50),
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .required()
        .email()
        .min(3)
        .max(50),
    package: Joi.string()
        .required()
        .min(9)
        .max(255),
    phone: Joi.string()
        .required()
        .min(7)
        .max(15)
        .pattern(/^[0-9]+$/)
});