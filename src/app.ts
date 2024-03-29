import express, {Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import Joi from "joi";
import packageRouter from "./routes/v1/package.router";
import userRouter from "./routes/v1/user.router";
import authRouter from "./routes/v1/auth.router";
import {errorHandler} from "./responses/error";
import messageRouter from "./routes/v1/message.router";
import blogRouter from "./routes/v1/blog.router";
import policyRouter from "./routes/v1/policy.router";
import aboutRouter from "./routes/v1/about.router";
import queryRouter from "./routes/v1/query.router";


Joi.object = require("joi-objectid")(Joi);

const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
dotenv.config({
    path: path.resolve(__dirname + `/config/development.env`)
});

app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));
app.use(errorHandler)
    .use(express.json())
    .use("/api/v1/auth", authRouter)
    .use("/api/v1/user", userRouter)
    .use("/api/v1/blog", blogRouter)
    .use("/api/v1/message", messageRouter)
    .use("/api/v1/package", packageRouter)
    .use("/api/v1/policy", policyRouter)
    .use("/api/v1/about", aboutRouter)
    .use("/api/v1/query", queryRouter)
    .use("/uploads", express.static("./uploads"))
    .all("*", (req: Request, res: Response) =>
        res.status(404)
            .send({message: "Route not found"})
    );


export default app;
