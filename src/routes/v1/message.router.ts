import { Router } from 'express';
import { authUser } from '../../middlewares/auth';
import { createMessage, getMessages } from "../../controllers/message/message.controller";
import { authAdmins } from "../../middlewares/access";
import { Roles } from "../../types/enums";


const messageRouter = Router();

messageRouter.route('/get')
    .all(authUser, authAdmins([Roles.ROOT, Roles.ADMIN, Roles.SUBADMIN]), getMessages)
    .get();

messageRouter.route('/create')
    .all(authUser, createMessage)
    .post();


export default messageRouter;