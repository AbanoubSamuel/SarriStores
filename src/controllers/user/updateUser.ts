import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { AuthenticatedReq } from '../../middlewares/auth';
import { Roles } from '../../types/enums';


export const checkUserRole = (roles: string[]) =>
{
    return (req: AuthenticatedReq, res: Response, next: NextFunction) =>
    {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403)
                .json({
                    error: 'Access denied! You do not have the required role.',
                });
        }
        next();
    };
};


//@desc         get all employees
//@route        GET /api/v1/users/employees/:id
//@access       private(admin, root)





