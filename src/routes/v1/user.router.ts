import { Router } from 'express';
import { deletePackage } from '../../controllers/package/package.controller';
import { authAdmins, checkRole } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import {
    addPackageToUser,
    addStoreToUser,
    deleteStoreFromUser, deleteUser,
    getMe, getStores,
    getUserById,
    getUsers,
    updateUser
} from '../../controllers/user/user.controller';
import { Roles } from '../../types/enums';

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
    .route('/store/add')
    .all(authUser, checkRole, addStoreToUser)
    .post();

userRouter
    .route('/store/all')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getStores)
    .get();
userRouter
    .route('/package/add')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), addPackageToUser)
    .patch();

userRouter
    .route('/store/delete')
    .all(authUser, checkRole, deleteStoreFromUser)
    .post();

userRouter
    .route('/currentUser')
    .all(authUser, getMe)
    .get();

userRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteUser)
    .delete();

export default userRouter;
