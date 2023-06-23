import {Router} from "express";
import {authAdmins, checkRole} from "../../middlewares/access.service";
import {authUser} from "../../middlewares/auth.service";
import {
    addPackageToUser,
    addStoreToUser, createAdmin,
    deleteStoreFromUser,
    deleteUser, getAdmins,
    getMe, getNewUsers,
    getStores,
    getUserById,
    getUsers,
    updateUser
} from "../../controllers/user/user.controller";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {updateUserSchecma} from "../../validators/user.validator";
import {uploadFileSchema} from "../../validators/file.validator";
import {upload} from "../../middlewares/uploads.service";

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
    .all(authAdmins([Roles.ROOT, Roles.ADMIN]), deleteUser)
    .delete();

userRouter
    .route("/store/add")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(uploadFileSchema, Req.file), upload.single("image"), addStoreToUser)
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

userRouter.route("/admin")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN]), getAdmins)
    .get();

userRouter
    .route("/new")
    .all(authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getNewUsers)
    .get();

export default userRouter;
