import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import Joi from 'joi';
import packageRouter from './routes/v1/package.router';
import userRouter from './routes/v1/user.router';
import authRouter from './routes/v1/auth.router';
import { upload } from './middlewares/uploads';
import { errorHandler } from './responses/error';
import messageRouter from './routes/v1/message.router';
import blogRouter from './routes/v1/blog.router';

Joi.object = require('joi-objectid')(Joi);

const app = express();
process.env.NODE_ENV !== 'production' && app.use(morgan('dev'));
dotenv.config({
    path: path.resolve(__dirname + `/config/development.env`)
});

app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));
app.use(errorHandler)
    .use(express.json())
    .use('/SarriStores/api/v1/auth', authRouter)
    .use('/SarriStores/api/v1/user', userRouter)
    .use('/SarriStores/api/v1/blog', blogRouter)
    .use('/SarriStores/api/v1/message', messageRouter)
    .use('/SarriStores/api/v1/package', packageRouter)
    .use('/uploads', express.static('./uploads'))
    .use('/SarriStores/api/v1/upload', upload.single('image'), (req, res) =>
    {
        res.status(200)
            .send({filename: `/uploads/${req.file?.filename}`});
    })

    .all('*', (req: Request, res: Response) =>
        res.status(404)
            .send({message: 'Route not found'})
    );

export default app;
