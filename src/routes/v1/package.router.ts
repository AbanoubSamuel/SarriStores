import {Router} from "express";
import {
    addPackage,
    deletePackage, getPackageById,
    getPackages,
    updatePackage
} from "../../controllers/package/package.controller";
import {authAdmins} from "../../middlewares/access.service";
import {authUser} from "../../middlewares/auth.service";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {
    createPackageSchema,
    deletePackageSchema,
    updatePackageSchema
} from "../../validators/package.validator";

const packageRouter = Router();


packageRouter
    .route("/get")
    .all(authUser, getPackageById)
    .get();

packageRouter
    .route("/all")
    .all(getPackages)
    .get();

packageRouter
    .route("/add")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN]),
        validator(createPackageSchema, Req.body), addPackage)
    .post();

packageRouter
    .route("/update")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN]),
        validator(updatePackageSchema, Req.body), updatePackage)
    .patch();

packageRouter
    .route("/delete")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN]),
        validator(deletePackageSchema, Req.query), deletePackage)
    .delete();

export default packageRouter;