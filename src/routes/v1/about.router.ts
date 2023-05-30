import {Router} from "express";
import {authUser} from "../../middlewares/auth.service";
import {authAdmins} from "../../middlewares/access.service";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {aboutSchema} from "../../validators/about.validator";
import {getAboutUs, updateAboutUs} from "../../controllers/aboutUs/aboutUs.controller";


const aboutRouter = Router();

aboutRouter.route("/get")
    .all(getAboutUs)
    .get();

aboutRouter.route("/update")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN]),
        validator(aboutSchema, Req.body), updateAboutUs)
    .put();

export default aboutRouter;