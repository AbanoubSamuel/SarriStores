import { Request, Response } from "express";
import { User } from '../../models/user.model';
import {Roles} from "../../types/enums";


export const login = async (req: Request, res: Response) =>
{
    const {
        email: email,
        password: enteredPassword,
    } = req.body;

    if (!email || !enteredPassword) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password.",
        });
    }

    const user = await User.findOne({ email });

    if (!(user !== null && await user.isPasswordsMatched(enteredPassword))) {
        return res.status(400).json({
            success: false,
            message: "Email or password are invalid.",
        });
    }

    const {
        password,
        ...userWithoutPassword
    } = user.toObject();
    const token: string = user.createToken();

    return res.status(200).json({
        success: true,
        message: "You are logged in successfully.",
        data: userWithoutPassword,
        token: token,
    });
};


export const register = async (req: Request, res: Response) =>
{
    try {
        const user = new User({
            ...req.body,
            role: Roles.USER
        });
        await user.save();
        const userWithoutPass = await User.findById(user._id).select("-password");
        return res.status(201).json({
            success: true,
            data: userWithoutPass,
            message: "Signup is successful"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to register user"
        });
    }
};

