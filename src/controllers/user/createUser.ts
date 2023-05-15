import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from "express";
import { User } from '../../models/user';
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
//@desc         create superadmin
//@route        POST /api/v1/users/superadmins
//@access       private(super admins)
export const createSubAdmin = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) =>
{
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const createdUser = await User.create({
            ...req.body,
            role: Roles.SUBADMIN,
        });

        res.status(201).json({
            success: true,
            message: "Super admin created successfully",
            data: createdUser,
        });
    } catch (error) {
        next(error);
    }
};


//@desc         create root
//@route        POST /api/v1/users/roots
//@access       private(super admins)



//@desc         get all admins
//@route        GET /api/v1/users/admins
//@access       private(admin, root)
export const createAdmin = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) =>
{
    try {
        const admin = await User.create({
            ...req.body,
            role: Roles.ADMIN,
        });
        return res.status(201).send({
            success: true,
            data: admin,
            message: "admin is created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "An error occurred while creating the admin",
        });
    }
};



// }
//@desc         REGISTER
//@route        POST /api/v1/users/register
//@access       public
export const createUser = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) =>
{
    try {
        const user = new User({
            ...req.body,
            role: Roles.USER,
        });

        await user.save();

        const userWithoutPass = await User.findById(user._id).select("-password");

        return res.status(201).json({
            success: true,
            data: userWithoutPass,
            message: "Signup is successful",
        });
    } catch (error) {
        next(error);
    }
};



// export const updateUser = async (
//     req: AuthenticatedReq,
//     res: Response,
//     next: NextFunction,
// ) =>
// {
//     try {
//         const update = req.body;
//         const user = await User.findByIdAndUpdate(req.user?._id, update);
//         await user.save();
//
//         const userWithoutPass = await User.findById(user._id).select("-password");
//
//         return res.status(201).json({
//             success: true,
//             data: userWithoutPass,
//             message: "Signup is successful",
//         });
//     } catch (error) {
//         next(error);
//     }
// };


export const updateUser = async (req: AuthenticatedReq, res: Response) =>
{
    const requestedUser = await User.findOne({_id: req.params.id ? req.params.id : req.user?._id});
    if (!requestedUser)
        return res
            .status(400)
            .send({error_en: 'Invalid User', error_ar: 'مستخدم غير صحيح'});
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    console.log('requestedUser');

    // req?.user?.role !== 'root' ? req.body.role : (req.body.role = userV.role)

    if (req.body.role) {
        if (req.user?.role == 'user') {
            req.body.role = 'user';
        } else if (req?.user?.role == 'admin' || req?.user?.role == 'subadmin') {
            req.body.role = req.body.role != 'root' ? req.body.role : 'admin';
        }
    }

    const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
            ...req.body,
        },
        {new: true},
    );
    if (!user) {
        return res.status(400).send({
            error_en: 'Cant Update User ',
            error_ar: 'غير قادر على تحديث المستخدم',
        });
    }
    res.status(200).send({
        success_en: 'User Updated Successfully ',
        success_ar: 'تم تحديث المستخدم بنجاح',
        user,
    });
};





