import { AuthenticatedReq } from "../../middlewares/auth";
import { Message } from "../../models/message";
import { Response } from "express";


// export const createMessage = (req: AuthenticatedReq, res: Response) =>
// {
//
// }


export const createMessage = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        const message = new Message({
            ...req.body,
        });

        const createdMessage = await message.save();

        return res.status(201)
            .json({
                success: true,
                message: 'Message sent successfully',
                data: createdMessage
            });

    } catch (error) {
        return res.status(201)
            .json({
                success: true,
                message: 'Failed to create a message !',
            });
    }
};


export const getAllMessages = async (req: AuthenticatedReq, res: Response) =>
{
    try {
        // default to page 1 if no page parameter is provided
        const page = parseInt(req.query.page as string) || 1;
        // default to 10 results per page if no limit parameter is
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const messages = await Message.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200)
            .json({
                success: true,
                message: 'Messages retrieved successfully',
                messages: messages,
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                message: 'Failed to retrieve messages',
            });
    }
};

