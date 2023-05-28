import {AuthReq} from "../../middlewares/auth.service";
import {Message} from "../../models/message.model";
import {Response} from "express";
import {sendMail} from "../../helpers/sendMail";


export const createMessage = async (req: AuthReq, res: Response) =>
{
    try {
        const message = new Message({
            ...req.body,
        });

        const createdMessage = await message.save();
        await sendMail(req);
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


export const getMessages = async (req: AuthReq, res: Response) =>
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


export const deleteMessage = async (req: AuthReq, res: Response) =>
{
    try {
        const messageId = req.query.messageId;
        const message = await Message.findById(messageId)
        if (!message) {
            return res.status(404)
                .json({
                    success: true,
                    message: 'Message not found successfully',
                });
        }

        await message.remove();
        return res.status(204)
            .json({
                success: true,
                message: 'Message deleted successfully',
            });

    } catch (error) {
        return res.status(500)
            .json({
                success: true,
                message: 'Failed to delete the message !',
            });
    }
};