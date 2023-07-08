import Joi from "joi";
import {IBlog} from "../models/blog.model";


export const createBlogSchema = Joi.object<IBlog>({
    text: Joi.string()
        .required()
        .min(9)
});


export const updateBlogSchema = Joi.object<IBlog>({
    text: Joi.string()
        .min(9)
});


export const deleteBlogSchema = Joi.object({
    blogId: Joi.string()
        .required()
});