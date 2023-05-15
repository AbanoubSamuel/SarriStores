import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { AuthenticatedReq } from '../../middlewares/auth';

//@desc         get superadmin by id
//@route        GET /api/v1/users/superadmins/:id
//@access       private(super admins)
export const getSuperAdmin = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const superAdmin = await User.findById(userId);
    if (!superAdmin) return res.status(404).send({success: false, message: 'user with this id is not found'});
    return res.send({
        success: true,
        data: superAdmin,
    });
};

//@desc         get root by id
//@route        GET /api/v1/users/roots/:id
//@access       private(super admins)
export const getRoot = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const root = await User.findById(userId);
    if (!root) return res.status(404).send({success: false, message: 'user with this id is not found'});
    return res.send({
        success: true,
        data: root,
    });
};

//@desc         get all admins
//@route        GET /api/v1/users/admins
//@access       private(admin, root)
export const getAdmin = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const admin = await User.findOne({_id: userId});
    if (!admin) return res.status(404).send({success: false, message: 'user with this id not found'});
    return res.send({
        success: true,
        data: admin,
    });
};

//@desc         get all employees
//@route        GET /api/v1/users/employees
//@access       private(admin, root, employee)
export const getEmployee = async (req: AuthenticatedReq, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    console.log(userId, req.user, '');

    // const employee = await User.findOne({_id: userId, company: req.user!.company});
    const employee = await User.findOne({_id: userId});
    console.log(employee, req.user, '');

    if (!employee) return res.status(404).send({success: false, message: 'user with this id not found'});
    return res.send({
        success: true,
        data: employee,
    });
};

