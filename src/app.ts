import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import Joi from 'joi';
import userRouter from './routes/v1/user.router';
import authRouter from './routes/v1/auth.router';
import { upload } from './middlewares/uploads';
import { errorHandler } from './responses/error';
import messageRouter from "./routes/v1/message.router";
import blogRouter from "./routes/v1/blog.router";


Joi.object = require('joi-objectid')(Joi);
// import ip from 'ip'
// const API_KEY = 'c0d773f89b0b8d96b8ec209db1b72153a8c5aefcf33813684dd561dd'
// const URL = 'https://ipgeolocation.abstractapi.com/v1/?api_key=' + API_KEY
// import axios from 'axios'
// const sendAPIRequest = async (ipAddress: any) => {
//   const apiResponse = await axios.get(URL + '&ip_address=' + ipAddress)
//   return apiResponse.data
// }
// import attend from './routes/v1/'

const app = express();
process.env.NODE_ENV !== 'production' && app.use(morgan('dev'));
dotenv.config({
    path: path.resolve(__dirname + `/config/development.env`),
});
app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}));

app.use(errorHandler)
    .use(express.json())
    .use('/SarriStores/api/v1/auth', authRouter)
    .use('/SarriStores/api/v1/user', userRouter)
    .use('/SarriStores/api/v1/blog', blogRouter)
    .use('/SarriStores/api/v1/message', messageRouter)
    .use('/uploads', express.static('./uploads'))
    .post('/SarriStores/api/v1/upload', upload.single('image'), (req, res) =>
    {
        res.status(200)
            .send({filename: req.file?.filename});
    })
    .all('*', (req: Request, res: Response) =>
        res.status(404)
            .send({message: 'Undefined Route'}),
    );

export default app;
