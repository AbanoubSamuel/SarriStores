import Joi from "joi";
import {IAbout} from "../models/about.model";


export const aboutSchema = Joi.object<IAbout>({
    paragraph: Joi.string()
        .required()
        .min(5)
});