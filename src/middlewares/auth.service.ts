import {NextFunction, Request, Response} from "express";
import {IUser, User} from "../models/user.model";
import jwt from "jsonwebtoken";
import DecodedToken from "../types/decodedToken";


export interface AuthReq extends Request {
    user?: IUser;
}


export const authUser = async (req: Request, res: Response, next: NextFunction) =>
{
    try {

        console.log(req.query);
        const token: string | undefined = req.header("Authorization")
            ?.replace("Bearer ", "");
        if (!token) {
            return res.status(401)
                .json({error: "Access denied! No token provided."});
        }

        const decoded: DecodedToken = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401)
                .json({error: "Invalid token!"});
        }

        (req as AuthReq).user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({error: "Invalid Token."});
    }
};


