import { NextFunction, Response } from 'express';
import { User } from '../../models/user';
import { AuthenticatedReq } from '../../middlewares/auth';
import { Roles } from '../../types/enums';

//@desc         delete superadmin
//@route        DELETE /api/v1/users/superadmins/:id
//@access       private(super admins)
export const deleteSuperAdmin = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const deletedSuperAdmin = await User.deleteOne({
        _id: req.params.id,
        role: Roles.SUBADMIN,
    });
    if (deletedSuperAdmin === null)
        return res.status(400).send({
            success: false,
            message: 'user not found',
        });
    res.status(204).json({
        success: true,
        message: 'super admin is deleted successfully',
        data: deletedSuperAdmin,
    });
};

//@desc         delete root
//@route        DELETE /api/v1/users/roots/:id
//@access       private(super admins)
export const deleteRoot = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const deletedRoot = await User.deleteOne(
        {_id: req.params.id, role: Roles.ROOT},
        {new: true},
    );
    if (deletedRoot === null)
        return res.status(400).send({
            success: false,
            message: 'user not found',
        });
    res.status(204).json({
        success: true,
        message: 'root is deleted successfully',
        data: deletedRoot,
    });
};

//@desc         delete admin
//@route        PATCH /api/v1/users/admins/:id
//@access       private(admin, root)
export const deleteAdmin = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const deletedAdmin = await User.deleteOne(
        {_id: req.params.id, role: Roles.ADMIN},
        {new: true},
    );
    // We need to check if this admin is in the same company
    if (deletedAdmin === null)
        return res.status(400).send({
            success: false,
            message: 'user not found',
        });

    res.status(204).json({
        success: true,
        message: 'admin is deleted successfully',
        data: deletedAdmin,
    });
};

//@desc         delete employee
//@route        PATCH /api/v1/users/employees/:id
//@access       private(admin, root)

