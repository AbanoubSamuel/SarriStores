import { Router } from 'express';
import {
    addPackage, deletePackage,
    getPackages, updatePackage
} from '../../controllers/package/package.controller';
import { authAdmins } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { Roles } from '../../types/enums';

const packageRouter = Router();

packageRouter
    .route('/all')
    .all(authUser, getPackages)
    .get();

packageRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), updatePackage)
    .patch();

packageRouter
    .route('/add')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), addPackage)
    .post();

packageRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deletePackage)
    .delete();

export default packageRouter;
