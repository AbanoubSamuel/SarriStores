import { NextFunction, Response } from "express";
import { User } from '../../models/user';
import { AuthenticatedReq } from "../../middlewares/auth";
import { Roles } from "../../types/enums";
import { Store } from "../../models/store";
import bcrypt from "bcryptjs";


export const createSubAdmin = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction,
) =>
{
    try {
        const {email} = req.body;
        const existingUser = await User.findOne({email});
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


export const createAdmin = async (req: AuthenticatedReq, res: Response) =>
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


export const user = async (req: AuthenticatedReq, res: Response, next: NextFunction) =>
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


export const updateUser = async (req: AuthenticatedReq, res: Response) =>
{
    try {

        const userId = res.locals?.userId;

        const requestedUser = await User.findById(userId);

        if (!requestedUser) {
            return res.status(400)
                .json({
                    error_en: 'Invalid User',
                    error_ar: 'مستخدم غير صحيح',
                });
        }

        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }


        if (req.user?.role === 'user') {
            req.body.role = 'user';
        }

        // const user = await User.findByIdAndUpdate(userId, {...req.body}, {new: true});

        const user = await User.findById(userId);
        if (user) {
            // Update the user object with the new values from req.body
            Object.assign(user, req.body);
            // Save the updated user
            await user.save();
        }

        if (!user) {
            return res.status(400)
                .json({
                    message_en: 'Cant Update User',
                    message_ar: 'غير قادر على تحديث المستخدم',
                });
        }

        return res.status(200)
            .json({
                message_en: 'User Updated Successfully',
                message_ar: 'تم تحديث المستخدم بنجاح',
                user: user,
            });
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({error: 'Internal Server Error'});
    }
};


export const addStoreToUser = async (req: AuthenticatedReq, res: Response) =>
{
    const store = [...req.body]

    const stores = await Promise.all(
        store.map(async (element) =>
        {
            const newStore = new Store({...element})
            await newStore.save()
            return newStore._id
        })
    )
    console.log(stores);
    const userId = req.query.userId as string;
    if (!userId) {
        res.status(400).json({
            message: 'You have to provide userId'
        })
    }
    const user = await User.findById(userId)

    if (user) {
        user.stores.push(...stores);
        const updatedUser = await user.save()
        res.status(200).json(
            {
                success: true,
                message: "Store added to user successfully",
                data: updatedUser

            }
        )
    } else {
        res.status(404).json(
            {
                success: false,
                message: "Provided user not found",
            }
        )
    }
}




