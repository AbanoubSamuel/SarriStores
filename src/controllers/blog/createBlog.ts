import { Blog } from "../../models/blog";
import { Response } from "express";
import { AuthenticatedReq } from "../../middlewares/auth";


export const createBlog = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        const blog = new Blog({
            ...req.body,
        });

        const createdBlog = await blog.save();

        return res.status(201)
            .json({
                success: true,
                message: 'Blog create successfully',
                blog: createdBlog
            });

    } catch (error) {
        return res.status(201)
            .json({
                success: true,
                message: 'Failed to create a blog !',
            });
    }
};


export const updateBlog = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        const blog = new Blog({
            ...req.body,
        });

        const createdBlog = await blog.save();

        return res.status(201)
            .json({
                success: true,
                message: 'Blog create successfully',
                blog: createdBlog
            });

    } catch (error) {
        return res.status(201)
            .json({
                success: true,
                message: 'Failed to create a blog !',
            });
    }
};











