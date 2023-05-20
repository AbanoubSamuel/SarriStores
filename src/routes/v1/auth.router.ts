import { Router } from 'express';
import loginController from '../../controllers/auth/./login.controller';
import { createUser } from '../../controllers/user/user.controller';
import { ReqTypes, validator } from '../../middlewares/validation.service';
import { createUserSchema } from '../../validators/user.validator';


const authRouter = Router();

authRouter.route('/loginController')
    .all(loginController)
    .post();

authRouter.route('/register')
    .all(validator(createUserSchema, ReqTypes.body), createUser)
    .post();

export default authRouter;
