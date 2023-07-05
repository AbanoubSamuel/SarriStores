import {AuthReq} from "../../middlewares/auth.service";
import {Query} from "../../models/query.model";
import {Response} from "express";


export const createQuery = async (req: AuthReq, res: Response) =>
{
    try {
        const query = new Query({
            ...req.body,
        });

        const createdQuery = await query.save();
        return res.status(201)
            .json({
                success: true,
                message: "Query saved successfully",
                data: createdQuery
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to save query !",
            });
    }
};


export const getQueries = async (req: AuthReq, res: Response) =>
{
    try {
        // default to page 1 if no page parameter is provided
        const page = parseInt(req.query.page as string) || 1;
        // default to 10 results per page if no limit parameter is
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const queries = await Query.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200)
            .json({
                success: true,
                message: "Queries retrieved successfully",
                messages: queries,
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: "Failed to retrieve queries",
            });
    }
};


export const deleteQuery = async (req: AuthReq, res: Response) =>
{
    try {
        const queryId = req.query.queryId;
        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(404)
                .json({
                    success: true,
                    message: "Query not found successfully",
                });
        }

        await query.remove();
        return res.status(204)
            .json({
                success: true,
                message: "Query deleted successfully",
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: true,
                message: "Failed to delete the query !",
            });
    }
};