import { Response } from 'express';
import { AuthenticatedReq } from '../../middlewares/auth.service';
import { Blog } from '../../models/blog.model';
import { Message } from '../../models/message.model';
import { Package } from '../../models/package.model';
import { Store } from '../../models/store.model';
import { User } from '../../models/user.model';

export const addPackage = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        const packageData = {...req.body};
        const savedPackage = await Package.create(packageData);
        return res.status(201).json({
            success: true,
            message: 'Package created successfully',
            package: savedPackage
        });
    } catch (e) {
        return res.status(201).json({
            success: false,
            message: 'Failed to create package'
        });

    }
};

export const getPackages = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        // default to page 1 if no page parameter is provided
        const page = parseInt(req.query.page as string) || 1;
        // default to 10 results per page if no limit parameter is
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const packages = await Package.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200)
            .json({
                success: true,
                message: 'Packages retrieved successfully',
                messages: packages
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: 'Failed to retrieve packages'
            });
    }
};

export const updatePackage = async (req: AuthenticatedReq, res: Response) =>
{
    try {

        const packageId = req.query.packageId as string;
        const pack = await Package.findById(packageId);
        if (!pack) {
            return res.status(409).json({
                success: false,
                message: 'Package was not found'
            });
        }
        const newPack = {...req.body};
        pack.set(newPack);
        const updatedPack = await pack.save();
        // Update the package with the data from req.body
        return res.status(201).json({
            success: true,
            message: 'Package updated successfully',
            package: updatedPack
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to update the Package!'
        });
    }
};

export const deletePackage = async (req: AuthenticatedReq, res: Response) =>
{
    try {

        const packageId = req.query.packageId as string;
        const pack = await Package.findById(packageId);
        if (!pack) {
            return res.status(409).json({
                success: false,
                message: 'Package was not found'
            });
        }
        const deletedPackage = await pack.deleteOne();
        return res.status(201).json({
            success: true,
            message: 'Package deleted successfully'
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Failed to delete the Package!'
        });
    }
};