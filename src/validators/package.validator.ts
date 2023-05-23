import Joi from "joi";
import {IPackage} from "../models/package.model";


export const createPackageSchema = Joi.object<IPackage>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    points: Joi.number()
        .required()
        .min(2)
        .max(255),
    price: Joi.number()
        .required()
        .min(2)
        .max(255)
});


export const updatePackageSchema = Joi.object<IPackage>({
    name: Joi.string()
        .min(3)
        .max(50),
    points: Joi.number()
        .min(2)
        .max(255),
    price: Joi.number()
        .min(2)
        .max(255)
});


export const deletePackageSchema = Joi.object({
    packageId: Joi.string()
        .required()
});