import Joi from "joi";
import {IBlog} from "../models/blog.model";


export const createBlogSchema = Joi.object<IBlog>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    text: Joi.string()
        .required()
        .min(9)
        .max(255),
    image: Joi.string()
        .min(3)
        .max(255)
});


export const updateBlogSchema = Joi.object<IBlog>({
    name: Joi.string()
        .min(3)
        .max(50),
    text: Joi.string()
        .min(9)
        .max(255),
    image: Joi.string()
        .min(3)
        .max(255)
});


export const deleteBlogSchema = Joi.object({
    blogId: Joi.string()
        .required()
});