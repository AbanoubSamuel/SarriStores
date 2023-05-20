import {Router} from 'express';
import {authAdmins} from '../../middlewares/access';
import {authUser} from '../../middlewares/auth';
import {Roles} from '../../types/enums';
import {blogController, getBlogs, updateBlog} from "../../controllers/blog/blog.controller";


const blogRouter = Router();


blogRouter
    .route('/all')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getBlogs)
    .get();

blogRouter
    .route('/create')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), blogController)
    .post();

blogRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), updateBlog)
    .patch();

blogRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), blogController)
    .delete();
export default blogRouter;