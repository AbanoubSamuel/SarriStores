import Joi from "joi";
import {IMessage} from "../models/message.model";


export const createMessageSchema = Joi.object<IMessage>({
    name: Joi.string()
        .required()
        .min(3)
        .max(50),
    email: Joi.string()
        .required()
        .email()
        .min(3)
        .max(50),
    text: Joi.string()
        .required()
        .min(9)
        .max(255)
});