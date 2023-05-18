import { Router } from 'express';
import { authUser } from '../../middlewares/auth';
import { createMessage, getAllMessages } from "../../controllers/message/message";


const messageRouter = Router();


messageRouter.route('/create')
    .all(authUser, createMessage)
    .post();

messageRouter.route('/get')
    .all(authUser, getAllMessages)
    .get();


export default messageRouter;