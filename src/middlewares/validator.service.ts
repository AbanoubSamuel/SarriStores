import {NextFunction, Request, Response} from "express";

export enum ReqTypes {
    body = "body",
    query = "query",
}

export const validator =
    (schema: any, type: ReqTypes = ReqTypes.body) =>
        (req: Request, res: Response, next: NextFunction) =>
        {
            const result = schema.validate(req[type]);

            if (result.error) {
                return res.status(400)
                    .json({
                        success: false,
                        message: result.error.details[0].message
                    });
            }
            req.body = result.value;
            next();
        };
