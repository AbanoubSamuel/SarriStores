import { Router } from 'express';
import { authAdmins } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { Roles } from '../../types/enums';
import { createBlog } from "../../controllers/blog/createBlog";


const blogRouter = Router();


blogRouter
    .route('/create')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), createBlog)
    .post();

blogRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), createBlog)
    .put();
export default blogRouter;