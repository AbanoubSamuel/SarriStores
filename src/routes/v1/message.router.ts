import { Router } from 'express';
import { authUser } from '../../middlewares/auth';
import { createMessage, getMessages } from "../../controllers/message/message.controller";


const messageRouter = Router();

messageRouter.route('/get')
    .all(authUser, getMessages)
    .get();

messageRouter.route('/create')
    .all(authUser, createMessage)
    .post();


export default messageRouter;