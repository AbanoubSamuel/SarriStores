import {Router} from "express";
import {Req, validator} from "../../middlewares/validator.service";
import {createUserSchema, loginUserSchema} from "../../validators/user.validator";
import {register, login} from "../../controllers/auth/auth.controller";


const authRouter = Router();

authRouter.route("/login")
    .all(validator(loginUserSchema, Req.body), login)
    .post();

authRouter.route("/register")
    .all(validator(createUserSchema, Req.body), register)
    .post();

export default authRouter;
