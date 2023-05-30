import {Router} from 'express';
import {authAdmins, checkRole} from '../../middlewares/access.service';
import {authUser} from '../../middlewares/auth.service';
import {
    addPackageToUser,
    addStoreToUser,
    deleteStoreFromUser,
    deleteUser,
    getMe,
    getStores,
    getUserById,
    getUsers,
    updateUser
} from '../../controllers/user/user.controller';
import {Roles} from '../../types/enums';
import {Req, validator} from "../../middlewares/validator.service";
import {updateUserSchecma} from "../../validators/user.validator";

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
    .all(authUser, checkRole, validator(updateUserSchecma, Req.body), updateUser)
    .patch();

userRouter
    .route('/currentUser')
    .all(authUser, getMe)
    .get();

userRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteUser)
    .delete();

userRouter
    .route('/store/add')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), addStoreToUser)
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
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteStoreFromUser)
    .post();


export default userRouter;
