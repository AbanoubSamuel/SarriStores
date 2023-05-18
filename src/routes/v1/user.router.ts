import { Router } from 'express';
import { getMe } from '../../controllers/user';
import { checkRole } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { addStoreToUser, updateUser } from "../../controllers/user/user";


const userRouter = Router();


userRouter
    .route('/update')
    .all(authUser, checkRole, updateUser)
    .patch();

userRouter
    .route('/addStore')
    .all(authUser, checkRole, addStoreToUser)
    .patch();

userRouter
    .route('/me')
    .all(authUser, getMe)
    .get();
// this will take the branch and department as query 

export default userRouter;
