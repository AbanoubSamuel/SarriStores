import {AuthReq} from "../../middlewares/auth.service";
import {Response} from "express";
import {About} from "../../models/about.model";

export const updateAboutUs = async (req: AuthReq, res: Response) =>
{
    try {
        const aboutId = req.query.aboutId as string;
        const newAbout = req.body.paragraph;

        const about = await About.findById(aboutId);
        if (!about) {
            return res.status(404)
                .json({
                    success: false,
                    message: "About us not found",
                });
        }

        about.paragraph = newAbout;
        const updatedAbout = await about.save();
        return res.status(200)
            .json({
                success: true,
                message: "About us updated successfully",
                data: updatedAbout
            });

    } catch (error) {
        return res.status(400)
            .json({
                success: true,
                message: "Failed to update about us !",
            });
    }
};


export const getAboutUs = async (req: AuthReq, res: Response) =>
{
    const about = await About.findOne({});
    if (!about) {
        return res.status(404)
            .json({
                success: false,
                message: "About us not found",
            });
    } else {
        return res.status(200)
            .json({
                success: true,
                message: "About us updated successfully",
                about: about
            });
    }
};