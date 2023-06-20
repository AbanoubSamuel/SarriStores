import {Response} from "express";
import {Package} from "../../models/package.model";
import {User} from "../../models/user.model";
import {AuthReq} from "../../middlewares/auth.service";
import {Store} from "../../models/store.model";
import bcrypt from "bcryptjs";
import {ObjectId} from "mongodb";


export const createAdmin = async (req: AuthReq, res: Response) =>
{
    try {
        const {email} = req.body;
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        const admin = await User.create({
            ...req.body,
        });
        return res.status(201).send({
            success: true,
            data: admin,
            message: "admin is created successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "An error occurred while creating the admin"
        });
    }
};

export const updateUser = async (req: AuthReq, res: Response) =>
{
    try {
        const userId = res.locals?.userId;
        const requestedUser = await User.findById(userId);
        if (!requestedUser) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Invalid User"
                });
        }
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        if (req.user?.role === "user") {
            req.body.role = "user";
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
                    success: false,
                    message: "User not found"
                });
        }
        return res.status(200)
            .json({
                success: true,
                message: "User Updated Successfully",
                user: user
            });
    } catch (err) {
        console.error(err);
        return res.status(500)
            .json({
                success: false,
                message: "Internal Server Error"
            });
    }
};

export const addStoreToUser = async (req: AuthReq, res: Response) =>
{
    const storeData = {...req.body};
    const newStore = new Store({...storeData});
    const userId = req.query.userId as string;

    if (!userId) {
        res.status(400).json({
            message: "You have to provide userId"
        });
        return;
    }

    const user = await User.findById(userId);

    if (user) {
        const image = req.body.image; // Assuming the uploaded file is available in req.file

        if (!image) {
            await newStore.deleteOne();
            return res.status(400).json({
                success: false,
                message: "Image path not found in the request"
            });
        }

        try {
            // Make a POST request to the image upload route
            // Set the image filename in the store document
            newStore.image = image;
            newStore.user = user._id; // Set the user property with the user ID
            await newStore.save();
        } catch (error) {
            console.error("Error uploading image:", error);
        }

        // Add the store to the user
        user.stores.push(newStore._id);
        const updatedUser = await user.save();
        const newUser = await User.findById(updatedUser._id).populate("stores");

        res.status(200).json({
            success: true,
            message: "Store added to user successfully",
            data: newUser
        });
    } else {
        // Delete the newly created store if the user doesn't exist
        await newStore.deleteOne();
        res.status(404).json({
            success: false,
            message: "Provided user not found"
        });
    }
};

export const deleteStoreFromUser = async (req: AuthReq, res: Response) =>
{
    try {
        const userId = req.query.userId as string;
        const storeId = new ObjectId(req.query.storeId as string);
        if (!userId) {
            return res.status(404).json({
                message: "You have to provide userId"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User was not found with provided ID"
            });
        }

        user.stores = user.stores.filter((store) => store.toString() !== storeId.toString());
        user.save();
        await Store.deleteOne(new ObjectId(storeId));
        return res.status(200).json({
            success: true,
            message: "Store deleted successfully"
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to delete the store"
        });
    }
};
// Delete the newly created store if the user doesn't exist
export const getMe = async (req: AuthReq, res: Response) =>
{
    const userId = req.user?._id;
    const user = await User.findOne({_id: userId}).select("-password")
        .populate("stores")
        .populate("package");
    if (!user) {
        return res
            .status(404).send({
                success: false,
                message: "user with this id not found"
            });
    }

    return res.send({
        success: true,
        user: user
    });
};

export const getUserById = async (req: AuthReq, res: Response) =>
{
    const userId = req.query.userId;
    const user = await User.findOne({_id: userId}).select("-password");
    if (!user) {
        return res
            .status(404)
            .send({
                success: false,
                message: "User with this id not found"
            });
    } else {
        return res.status(200)
            .send({
                success: true,
                message: "User fetched successfully",
                user: user
            });
    }
};

export const getUsers = async (req: AuthReq, res: Response) =>
{
    try {
        const page = parseInt(req.query.page as string) || 1; // Current page number
        const limit = parseInt(req.query.limit as string) || 10; // Number of documents to fetch per page

        const count = await User.countDocuments({role: "user"}); // Count only users with role "user"
        const totalPages = Math.ceil(count / limit);

        const users = await User.find({role: "user"}) // Find only users with role "user"
            .select("-password")
            .skip((page - 1) * limit)
            .limit(limit);

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Users not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: users,
            count: count,
            page: page,
            totalPages: totalPages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

export const getAdmins = async (req: AuthReq, res: Response) =>
{
    try {
        const page = parseInt(req.query.page as string) || 1; // Current page number
        const limit = parseInt(req.query.limit as string) || 10; // Number of documents to fetch per page

        const roles = ["admin", "subadmin"]; // Roles to filter

        const count = await User.countDocuments({role: {$in: roles}}); // Count users with roles in the specified array
        const totalPages = Math.ceil(count / limit);

        const admins = await User.find({role: {$in: roles}}) // Find users with roles in the specified array
            .select("-password")
            .skip((page - 1) * limit)
            .limit(limit);

        if (admins.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Users not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admins fetched successfully",
            admins: admins,
            count: count,
            page: page,
            totalPages: totalPages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

export const addPackageToUser = async (req: AuthReq, res: Response) =>
{
    try {
        const userId = req.query.userId;
        const packageId = req.query.packageId;
        if (!userId || !packageId) {
            return res.status(400).json({
                success: false,
                message: "Please provide booth userId & packageId"
            });
        }

        const user = await User.findById(userId);
        const pack = await Package.findById(packageId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!pack) {
            return res.status(404).json({
                success: false,
                message: "Package not found"
            });
        }

        user.package = pack._id;
        const updatedUser = await user.save();

        return res.status(201).json({
            success: true,
            message: "package added to user successfully",
            user: updatedUser
        });
    } catch (e) {
        return res.status(403).json({
            success: true,
            message: "Failed to add package to user"
        });
    }

};

export const deleteUser = async (req: AuthReq, res: Response) =>
{
    try {

        const userId = req.query.userId as string;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "User was not found"
            });
        }

        await user.remove();
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete the user!"
        });
    }
};

export const getStores = async (req: AuthReq, res: Response) =>
{
    const page = parseInt(req.query.page as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 10; // Number of documents to fetch per page

    try {
        const count = await Store.countDocuments();
        const totalPages = Math.ceil(count / limit);

        const stores = await Store.find({})
            .select("-password")
            .skip((page - 1) * limit)
            .limit(limit);

        if (stores.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Stores not found",
            });
        }

        return res.json({
            success: true,
            message: "Stores fetched successfully",
            stores: stores,
            page: page,
            totalPages: totalPages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch stores",
        });
    }
};

export const getNewUsers = async (req: AuthReq, res: Response) =>
{
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const user = await User.find({
            createdAt: {$gte: thirtyDaysAgo},
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users: user,
        });
    } catch (error) {
        // Handle any errors here
        console.error("Error retrieving users:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
        });
    }
};