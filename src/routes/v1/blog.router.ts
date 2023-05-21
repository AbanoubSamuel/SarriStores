import { Router } from 'express';
import { authAdmins } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { Roles } from '../../types/enums';
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../../controllers/blog/createBlog";


const blogRouter = Router();


blogRouter
    .route('/get')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getBlogs)
    .get();

blogRouter
    .route('/create')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), createBlog)
    .post();

blogRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), updateBlog)
    .patch();

blogRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteBlog)
    .delete();
export default blogRouter;