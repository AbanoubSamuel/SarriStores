import { NextFunction, Response } from 'express';
import { User } from '../models/user.model';
import { adminRoles } from '../types/authRoles';
import { Roles } from '../types/enums';
import { AuthReq } from './auth.service';

export function authAdmins(allowedRoles: Roles[])
{
    return function (req: AuthReq, res: Response, next: NextFunction)
    {
        const role = req.user?.role;// Assuming the user object contains the role property

        if (allowedRoles.includes(<Roles>role)) {
            // User role is allowed, proceed to the next middleware or route handler
            next();
        } else {
            // User role is not allowed, return a 403 Forbidden response
            return res.status(403).json({
                success: false,
                message: 'Access denied! You do not have the permission to perform this action.'
            });
        }
    };
}

export const checkRole = async (req: AuthReq, res: Response, next: NextFunction) =>
{
    if (req.user?.role !== Roles.USER) {
        const userId = req.query.userId;

        if (!userId) {
            res.locals.userId = req.user?.id;
            next();
        }

        const requestedUser = await User.findById(userId);

        if (requestedUser && req.user) {
            if (!adminRoles[req.user?.role].includes(requestedUser.role)) {
                res.status(401)
                    .json({
                        success: false,
                        message: 'You are not authorized !'
                    });
            } else {
                res.locals.userId = requestedUser._id;
                next();
            }
        }
    } else {
        res.locals.userId = req.user.id;
        next();
    }
};
