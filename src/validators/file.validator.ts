import Joi from "joi";


export const uploadFileSchema = Joi.object({
    mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/gif").required()
});


