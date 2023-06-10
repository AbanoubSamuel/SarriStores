import {Router} from "express";
import {authAdmins, checkRole} from "../../middlewares/access.service";
import {authUser} from "../../middlewares/auth.service";
import {
    addPackageToUser,
    addStoreToUser, createAdmin, createSubAdmin,
    deleteStoreFromUser,
    deleteUser,
    getMe,
    getStores,
    getUserById,
    getUsers,
    updateUser
} from "../../controllers/user/user.controller";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {updateUserSchecma} from "../../validators/user.validator";

const userRouter = Router();

userRouter.use(authUser);

userRouter
    .route("/")
    .all(getUserById)
    .get();

userRouter
    .route("/all")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getUsers)
    .get();

userRouter
    .route("/update")
    .all(checkRole, validator(updateUserSchecma, Req.body), updateUser)
    .patch();

userRouter
    .route("/currentUser")
    .all(getMe)
    .get();

userRouter
    .route("/delete")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteUser)
    .delete();

userRouter
    .route("/store/add")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), addStoreToUser)
    .post();

userRouter
    .route("/store/all")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getStores)
    .get();

userRouter
    .route("/package/add")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), addPackageToUser)
    .patch();

userRouter
    .route("/store/delete")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteStoreFromUser)
    .delete();


userRouter
    .route("/admin/add")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN]), createAdmin)
    .post();

userRouter
    .route("/subadmin/add")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN]), createSubAdmin)
    .post();

export default userRouter;
