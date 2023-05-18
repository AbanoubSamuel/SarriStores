import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/user';
import { AuthenticatedReq } from '../../middlewares/auth';

export const getMe = async (req: AuthenticatedReq, res: Response) =>
{
    const userId = req.user?._id;
    const user = await User.findOne({_id: userId}).select('-password');
    if (!user)
        return res
            .status(404)
            .send({success: false, message: 'user with this id not found'});
    return res.send({
        success: true,
        data: user,
    });
};
export const getUser = async (
    req: AuthenticatedReq,
    res: Response,
    next: NextFunction
) =>
{
    const userId = req.query.id;
    const user = await User.findOne({_id: userId}).select('-password');
    if (!user)
        return res
            .status(404)
            .send({success: false, message: 'user with this id not found'});
    return res.send({
        success: true,
        data: user,
    });
};
