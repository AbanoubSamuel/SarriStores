import { NextFunction, Response } from 'express';
import { User } from '../../models/user';
import { AuthenticatedReq } from '../../middlewares/auth';




export const getAllSubadmins = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const allSupervisors = await User.find({role: 'subadmin'});
    return res.send({
        success: true,
        data: allSupervisors,
        message: 'Users are fetched successfully',
    });
};



export const getAllAdminsInCompany = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const allAdmins = await User.find({
        role: 'admin',
        company: req.params.company,
    });
    if (!allAdmins[0]) {
        return res
            .status(404)
            .send({error_en: 'You don\'t have admins yet on the company..'});
    }
    return res.send({
        success: true,
        data: allAdmins,
        message: 'Users are fetched successfully',
    });
};
//@desc         get all admins in branch
//@route        GET /api/v1/users/admins/:branch
//@access       private(admin, root)
export const getAllAdminsInBranch = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const allAdmins = await User.find({
        role: 'admin',
        company: req.params.branch,
    });
    if (!allAdmins[0]) {
        return res
            .status(404)
            .send({error_en: 'You don\'t have admins yet on the branch..'});
    }
    return res.send({
        success: true,
        data: allAdmins,
        message: 'Users are fetched successfully',
    });
};
//@desc         get all admins in department
//@route        GET /api/v1/users/admins/:department
//@access       private(admin, root)
export const getAllAdminsInDepartment = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const allAdmins = await User.find({
        role: 'admin',
        company: req.params.department,
    });
    if (!allAdmins[0]) {
        return res
            .status(404)
            .send({error_en: 'You don\'t have admins yet on the department..'});
    }
    return res.send({
        success: true,
        data: allAdmins,
        message: 'Users are fetched successfully',
    });
};





//@desc         get all employees on branch
//@route        GET /api/v1/users/employye/department/:department
//@access       private(admin, root, employee)
export const getAllEmployeesInShift = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const allEmployees = await User.find({
        role: ['employee', 'admin'],
        shift: req.params.shift,
    });
    if (!allEmployees[0]) {
        return res
            .status(404)
            .send({error_en: 'You don\'t have employees yet on the shift..'});
    }
    return res.send({
        success: true,
        data: allEmployees,
        message: 'Users are fetched successfully',
    });
};
//@desc         get all admins and owner
//@route        GET /api/v1/users/employye/infoComapny
//@access       private(admin, root, employee)

//@desc         get me
//@route        GET /api/v1/users/employye/me
//@access       private(admin, root, employee)
export const getMe = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) => {
    const user: any = await User.find({_id: req.user?._id});
    if (!user) {
        return res.status(404).send({error_en: 'Invalid User'});
    }

    return res.send({
        success: true,
        data: user,
        message: 'Users are fetched successfully',
    });
};

// get all employees based on the role

