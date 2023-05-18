import { Router } from 'express';
import { authAdmins } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { Roles } from '../../types/enums';
import { blog } from "../../controllers/blog/blog";


const blogRouter = Router();


blogRouter
    .route('/create')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), blog)
    .post();

blogRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), blog)
    .put();
export default blogRouter;