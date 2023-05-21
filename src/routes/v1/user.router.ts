import { Router } from 'express';
import { authAdmins, checkRole } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import {
    addStoreToUser,
    deleteStoreFromUser,
    getMe,
    getUserById,
    getUsers,
    updateUser
} from "../../controllers/user/user.controller";
import { Roles } from "../../types/enums";


const userRouter = Router();

userRouter
    .route('/')
    .all(authUser, getUserById)
    .get();

userRouter
    .route('/all')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getUsers)
    .get();

userRouter
    .route('/update')
    .all(authUser, checkRole, updateUser)
    .patch();

userRouter
    .route('/add')
    .all(authUser, checkRole, addStoreToUser)
    .post();

userRouter
    .route('/store/delete')
    .all(authUser, checkRole, deleteStoreFromUser)
    .post();

userRouter
    .route('/currentUser')
    .all(authUser, getMe)
    .get();
// this will take the branch and department as query 

export default userRouter;
