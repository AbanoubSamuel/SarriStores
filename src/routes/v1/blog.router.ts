import {Router} from 'express';
import {authAdmins} from '../../middlewares/access.service';
import {authUser} from '../../middlewares/auth.service';
import {Roles} from '../../types/enums';
import {createBlog, deleteBlog, getBlogs, updateBlog} from "../../controllers/blog/createBlog";
import {ReqTypes, validator} from "../../middlewares/validator.service";
import {createBlogSchema, deleteBlogSchema, updateBlogSchema} from "../../validators/blog.validator";


const blogRouter = Router();


blogRouter
    .route('/get')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getBlogs)
    .get();

blogRouter
    .route('/create')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(createBlogSchema, ReqTypes.body), createBlog)
    .post();

blogRouter
    .route('/update')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(updateBlogSchema, ReqTypes.body), updateBlog)
    .patch();

blogRouter
    .route('/delete')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(deleteBlogSchema, ReqTypes.query), deleteBlog)
    .delete();
export default blogRouter;