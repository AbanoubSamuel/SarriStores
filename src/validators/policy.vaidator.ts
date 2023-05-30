import Joi from "joi";
import {IPolicy} from "../models/policy.model";


export const policySchema = Joi.object<IPolicy>({
    paragraph: Joi.string()
        .required()
        .min(5)
});