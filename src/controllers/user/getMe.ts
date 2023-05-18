import { Response } from 'express';
import { AuthenticatedReq } from '../../middlewares/auth';
import { User } from '../../models/user';


export const getMe = async (req: AuthenticatedReq, res: Response) => {

    try {
        const userId = req.user?._id;
        const user = await User.findOne(userId);


        if (!user) {
            return res.status(400).json({
                error_en: 'Invalid User',
                error_ar: 'مستخدم غير صحيح',
            });
        }

        return res.status(200).json({
            message_en: 'User Updated Successfully',
            message_ar: 'تم تحديث المستخدم بنجاح',
            user: user,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};