import {Router} from "express";
import {authUser} from "../../middlewares/auth.service";
import {
    createMessage,
    deleteMessage,
    getMessages
} from "../../controllers/message/message.controller";
import {authAdmins} from "../../middlewares/access.service";
import {Roles} from "../../types/enums";
import {Req, validator} from "../../middlewares/validator.service";
import {createQuerySchema} from "../../validators/query.validator";
import {createQuery, deleteQuery, getQueries} from "../../controllers/query/query.controller";


const queryRouter = Router();

queryRouter.route("/get")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getQueries)
    .get();

queryRouter.route("/create")
    .all(validator(createQuerySchema, Req.body), createQuery)
    .post();

queryRouter.route("/delete")
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteQuery)
    .delete();


export default queryRouter;