import {Response, Router} from "express";
import {authAdmins} from "../../middlewares/access.service";
import {AuthReq, authUser} from "../../middlewares/auth.service";
import {Roles} from "../../types/enums";
import {createBlog, deleteBlog, getBlogs, updateBlog} from "../../controllers/blog/blog.controler";
import {Req, validator} from "../../middlewares/validator.service";
import {createBlogSchema, deleteBlogSchema, updateBlogSchema} from "../../validators/blog.validator";
import {upload} from "../../middlewares/uploads.service";
import {uploadFileSchema} from "../../validators/file.validator";

const blogRouter = Router();

blogRouter.use("/api/v1/upload", upload.single("image"), (req: AuthReq, res: Response) =>
{
    res.status(200)
        .send({filename: `/uploads/${req.file?.filename}`});
});

blogRouter
    .route("/get")
    .all(authUser, getBlogs)
    .get();

blogRouter
    .route("/create")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(uploadFileSchema, Req.file), upload.single("image"),
        validator(createBlogSchema, Req.body), createBlog)
    .post();

blogRouter
    .route("/update")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(updateBlogSchema, Req.body), updateBlog)
    .patch();

blogRouter
    .route("/delete")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]),
        validator(deleteBlogSchema, Req.query), deleteBlog)
    .delete();
export default blogRouter;