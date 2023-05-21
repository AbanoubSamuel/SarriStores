import { NextFunction, Response } from 'express';
import { User } from '../../models/user.model';
import { AuthenticatedReq } from '../../middlewares/auth';
import { Roles } from '../../types/enums';
import { Store } from '../../models/store.model';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export const createSubAdmin = async (req: AuthenticatedReq, res: Response, next: NextFunction) =>
{
    try {
        const {email} = req.body;
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        const createdUser = await User.create({
            ...req.body,
            role: Roles.SUBADMIN
        });
        res.status(201).json({
            success: true,
            message: 'Super admin created successfully',
            data: createdUser
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
            role: Roles.ADMIN
        });
        return res.status(201).send({
            success: true,
            data: admin,
            message: 'admin is created successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'An error occurred while creating the admin'
        });
    }
};
export const createUser = async (req: AuthenticatedReq, res: Response, next: NextFunction) =>
{
    try {
        const user = new User({
            ...req.body,
            role: Roles.USER
        });
        await user.save();
        const userWithoutPass = await User.findById(user._id).select('-password');
        return res.status(201).json({
            success: true,
            data: userWithoutPass,
            message: 'Signup is successful'
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
                    message: 'Invalid User'
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
                    message: 'Cant Update User'
                });
        }
        return res.status(200)
            .json({
                message: 'User Updated Successfully',
                user: user
            });
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({error: 'Internal Server Error'});
    }
};
export const addStoreToUser = async (req: AuthenticatedReq, res: Response) =>
{
    const storeData = {...req.body};
    const newStore = new Store({...storeData});
    await newStore.save();
    const userId = req.query.userId as string;
    if (!userId) {
        res.status(400).json({
            message: 'You have to provide userId'
        });
        return;
    }
    const user = await User.findById(userId);
    if (user) {
        const image = req.body.image; // Assuming the uploaded file is available in req.file
        if (!image) {
            await newStore.deleteOne();
            res.status(400).json({
                success: false,
                message: 'Image file not found in the request'
            });
            return;
        }
        try {
            // Make a POST request to the image upload route
            // Set the image filename in the store document
            newStore.image = image;
            await newStore.save();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        // Add the store to the user
        user.stores.push(newStore._id);
        const updatedUser = await user.save();
        const newUser = await User.findById(updatedUser._id).populate('stores');
        res.status(200).json({
            success: true,
            message: 'Store added to user successfully',
            data: newUser
        });
    } else {
        // Delete the newly created store if the user doesn't exist
        await newStore.deleteOne();
        res.status(404).json({
            success: false,
            message: 'Provided user not found'
        });
    }
};
export const deleteStoreFromUser = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        const userId = req.query.userId as string;
        const storeId = new ObjectId(req.query.storeId as string);
        if (!userId) {
            return res.status(404).json({
                message: 'You have to provide userId'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User was not found with provided ID'
            });
        }

        user.stores = user.stores.filter((store) => store.toString() !== storeId.toString());
        user.save();
        await Store.deleteOne(new ObjectId(storeId));
        return res.status(200).json({
            success: true,
            message: 'Store deleted successfully'
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete the store'
        });
    }
};
// Delete the newly created store if the user doesn't exist
export const getMe = async (req: AuthenticatedReq, res: Response) =>
{
    const userId = req.user?._id;
    const user = await User.findOne({_id: userId}).select('-password')
        .populate('stores')
        .populate('packages');
    if (!user)
        return res
            .status(404)
            .send({success: false, message: 'user with this id not found'});
    return res.send({
        success: true,
        data: user
    });
};
export const getUserById = async (req: AuthenticatedReq, res: Response) =>
{
    const userId = req.query.userId;
    const user = await User.findOne({_id: userId}).select('-password');
    if (!user) {
        return res
            .status(404)
            .send({
                success: false,
                message: 'User with this id not found'
            });
    } else {
        return res.status(200)
            .send({
                success: true,
                message: 'User fetched successfully',
                user: user
            });
    }
};
export const getUsers = async (req: AuthenticatedReq, res: Response) =>
{
    const users = await User.find({}).select('-password');
    if (!users) {
        return res
            .status(404)
            .send({
                success: false,
                message: 'Users not found'
            });
    } else {
        return res.send({
            success: true,
            message: 'Users fetched successfully',
            users: users
        });
    }
};
// export const addPackageToUser = async (req: AuthenticatedReq, res: Response) =>
// {
//     const storeData = {...req.body};
//
//     const newStore = new Store({...storeData});
//     await newStore.save();
//
//     const userId = req.query.userId as string;
//     if (!userId) {
//         res.status(400).json({
//             message: 'You have to provide userId'
//         });
//         return;
//     }
//     const user = await User.findById(userId);
//
//     if (user) {
//         const image = req.body.image; // Assuming the uploaded file is available in req.file
//         if (!image) {
//             await newStore.deleteOne();
//             res.status(400).json({
//                 success: false,
//                 message: 'Image file not found in the request'
//             });
//             return;
//         }
//
//         try {
//             // Make a POST request to the image upload route
//             // Set the image filename in the store document
//             newStore.image = image;
//             await newStore.save();
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//
//         // Add the store to the user
//         user.stores.push(newStore._id);
//         const updatedUser = await user.save();
//
//         const newUser = await User.findById(updatedUser._id).populate('stores');
//         res.status(200).json({
//             success: true,
//             message: 'Store added to user successfully',
//             data: newUser
//         });
//     } else {
//         // Delete the newly created store if the user doesn't exist
//         await newStore.deleteOne();
//         res.status(404).json({
//             success: false,
//             message: 'Provided user not found'
//         });
//     }
// };