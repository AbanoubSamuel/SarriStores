import {Response} from "express";
import {AuthReq} from "../../middlewares/auth.service";
import {Package} from "../../models/package.model";

export const addPackage = async (req: AuthReq, res: Response) =>
{
    try {
        const packageData = {...req.body};
        const savedPackage = await Package.create(packageData);
        return res.status(201).json({
            success: true,
            message: "Package created successfully",
            package: savedPackage
        });
    } catch (e) {
        return res.status(201).json({
            success: false,
            message: "Failed to create package"
        });

    }
};

export const getPackages = async (req: AuthReq, res: Response) =>
{
    try {

        const page = parseInt(req.query.page as string) || 1; // default to page 1 if no page parameter is provided
        const limit = parseInt(req.query.limit as string) || 10;         // default to 10 results per page if no limit parameter is

        const count = await Package.countDocuments();
        const totalPages = Math.ceil(count / limit);
        const skip = (page - 1) * limit;

        const packages = await Package.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200)
            .json({
                success: true,
                message: "Packages retrieved successfully",
                messages: packages,
                page: page,
                totalPages: totalPages
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to retrieve packages"
            });
    }
};
export const getPackageById = async (req: AuthReq, res: Response) =>
{
    try {
        const packageId = req.query.packageId as string;
        const foundPackage = await Package.findById(packageId);
        if (!packageId) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Package not found",
                });
        }

        return res.status(200)
            .json({
                success: true,
                message: "Package retrieved successfully",
                package: foundPackage,
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to retrieve package"
            });
    }
};
export const updatePackage = async (req: AuthReq, res: Response) =>
{
    try {

        const packageId = req.query.packageId as string;
        const pack = await Package.findById(packageId);
        if (!pack) {
            return res.status(409).json({
                success: false,
                message: "Package was not found"
            });
        }
        const newPack = {...req.body};
        pack.set(newPack);
        await pack.save();
        // Update the package with the data from req.body
        return res.status(201).json({
            success: true,
            message: "Package updated successfully",
            package: newPack
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the Package!"
        });
    }
};

export const deletePackage = async (req: AuthReq, res: Response) =>
{
    try {

        const packageId = req.query.packageId as string;
        const pack = await Package.findById(packageId);
        if (!pack) {
            return res.status(409).json({
                success: false,
                message: "Package was not found"
            });
        }

        const deletedPack = await pack.deleteOne();
        return res.status(202).json({
            success: true,
            message: "Package deleted successfully",
            package: deletedPack
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete the Package!"
        });
    }
};