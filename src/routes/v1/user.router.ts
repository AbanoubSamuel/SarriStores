import { Router } from 'express';
import { createUser, updateUser } from '../../controllers/user/createUser';
import { checkRole } from '../../middlewares/access';
import { authUser } from '../../middlewares/auth';
import { Roles } from '../../types/enums';


const userRouter = Router();
//(START)________----_____-----_____ :> WHO CAN ACCESS ON THIS ROUTES : > ________----_____-----_____ (ROOT)
// to get all admins on company
userRouter
    .route('/auth/login')
    .all().post();


userRouter
    .route('/auth/register')
    .all(createUser).post();

userRouter
    .route('/auth/update')
    .all(authUser, updateUser).put();
// this will take the branch and department as query 

export default userRouter;
