import { Router } from 'express';
import login from '../../controllers/auth/login';
import { createUser } from '../../controllers/user/user.controller';
import { ReqTypes, validator } from '../../middlewares/validation.service';
import { createUserSchema } from '../../validators/user.validator';


const authRouter = Router();

authRouter.route('/login')
    .all(login)
    .post();

authRouter.route('/register')
    .all(validator(createUserSchema, ReqTypes.body), createUser)
    .post();

export default authRouter;
