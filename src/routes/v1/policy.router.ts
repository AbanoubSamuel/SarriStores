import {Router} from "express";
import {authUser} from "../../middlewares/auth.service";
import {authAdmins} from "../../middlewares/access.service";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {getPolicy, updatePolicy} from "../../controllers/policy/policy.controller";
import {policySchema} from "../../validators/policy.vaidator";


const messageRouter = Router();

messageRouter.route("/get")
    .all(getPolicy)
    .get();

messageRouter.route("/update")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN]),
        validator(policySchema, Req.body), updatePolicy)
    .put();

export default messageRouter;