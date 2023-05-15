import { Router } from 'express';
import login from '../../controllers/auth/login';
import { createUser } from '../../controllers/user/createUser';
import { ReqTypes, validatorService } from '../../middlewares/validation.service';
import { createUserSchema } from '../../validators/user.validator';


const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', validatorService(createUserSchema, ReqTypes.body), createUser);

export default authRouter;
