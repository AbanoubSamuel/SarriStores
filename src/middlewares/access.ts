import { NextFunction, Response } from 'express';
import { User } from '../models/user';
import { adminRoles } from '../types/authRoles';
import { Roles } from '../types/enums';
import { AuthenticatedReq } from './auth';

export function authAdmins(allowedRoles: Roles[])
{
    return function (req: AuthenticatedReq, res: Response, next: NextFunction) {
        const role = req.user?.role;// Assuming the user object contains the role property

        if (allowedRoles.includes(<Roles>role)) {
            // User role is allowed, proceed to the next middleware or route handler
            next();
        } else {
            // User role is not allowed, return a 403 Forbidden response
            return res.status(403).json({
                error: 'Access denied! You do not have the permission to perform this action.',
            });
        }
    };
}


export const checkRole = async (req: AuthenticatedReq, res: Response, next: NextFunction) =>
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
                        message_en: 'You are not authorized !',
                        message_ar: 'ليس لديك الصلاحية !'
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


