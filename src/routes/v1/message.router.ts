import {Router} from 'express';
import {authUser} from '../../middlewares/auth.service';
import {
    createMessage,
    deleteMessage,
    getMessages
} from "../../controllers/message/message.controller";
import {authAdmins} from "../../middlewares/access.service";
import {Roles} from "../../types/enums";
import {ReqTypes, validator} from "../../middlewares/validator.service";
import {createMessageSchema} from "../../validators/message.validator";


const messageRouter = Router();

messageRouter.route('/get')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getMessages)
    .get();

messageRouter.route('/create')
    .all(authUser, validator(createMessageSchema, ReqTypes.body), createMessage)
    .post();

messageRouter.route('/delete')
    .all(authUser, validator(createMessageSchema, ReqTypes.body),
        authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), deleteMessage)
    .delete();


export default messageRouter;