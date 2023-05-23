import {Router} from 'express';
import {addPackage, deletePackage, getPackages, updatePackage} from '../../controllers/package/package.controller';
import {authAdmins} from '../../middlewares/access.service';
import {authUser} from '../../middlewares/auth.service';
import {Roles} from '../../types/enums';
import {ReqTypes, validator} from "../../middlewares/validator.service";
import {createPackageSchema, deletePackageSchema, updatePackageSchema} from "../../validators/package.validator";

const packageRouter = Router();

packageRouter
    .route('/all')
    .all(authUser, getPackages)
    .get();

packageRouter
    .route('/add')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(createPackageSchema, ReqTypes.body), addPackage)
    .post();

packageRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(updatePackageSchema, ReqTypes.body), updatePackage)
    .patch();

packageRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(deletePackageSchema, ReqTypes.query), deletePackage)
    .delete();

export default packageRouter;
