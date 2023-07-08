import {Blog} from "../../models/blog.model";
import {Response} from "express";
import {AuthReq} from "../../middlewares/auth.service";



export const getBlogs = async (req: AuthReq, res: Response) =>
{
    try {
        // default to page 1 if no page parameter is provided
        const page = parseInt(req.query.page as string) || 1;
        // default to 10 results per page if no limit parameter is
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find({})
            .skip(skip)
            .limit(limit);

        if (blogs.length == 0) {
            return res.status(404)
                .json({
                    success: true,
                    message: "No blogs found",
                });
        }

        return res.status(200)
            .json({
                success: true,
                message: "Blogs retrieved successfully",
                blogs: blogs,
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                blogs: "Failed to retrieve blogs",
            });
    }
};

export const createBlog = async (req: AuthReq, res: Response) =>
{

    try {
        const blog = new Blog({
            ...req.body,
            image: `/uploads/${req.file?.filename}`
        });

        const createdBlog = await blog.save();

        return res.status(201)
            .json({
                success: true,
                message: "Blog create successfully",
                blog: createdBlog
            });

    } catch (error) {
        console.log(error);
        return res.status(400)
            .json({
                success: false,
                message: "Failed to create a blog !",
            });
    }
};

export const updateBlog = async (req: AuthReq, res: Response) =>
{
    try {
        const blogId = req.query.blogId as string;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(409).json({
                success: false,
                message: "Blog was not found",
            });
        }

        // Update the blog with the data from req.body
        blog.text = req.body.text;

        const updatedBlog = await blog.save();
        return res.status(201).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update the blog!",
        });
    }
};

export const deleteBlog = async (req: AuthReq, res: Response) =>
{
    try {
        const blogId = req.query.blogId as string;
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(409).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Delete the blog with the id from req.query
        const deletedBlog = await blog.deleteOne();
        return res.status(204).json({
            success: true,
            message: "Blog deleted successfully",
            blog: deletedBlog,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete the blog!",
        });
    }
};





