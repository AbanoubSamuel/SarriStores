import mongoose, { ConnectOptions } from "mongoose";
import app from "./app";
import * as http from "http";


mongoose.set("strictQuery", true);
const server = http.createServer(app);
//Connecting to database
(async () =>
{
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        server.listen(process.env.PORT || 5000);
        console.log("Connected to database successfully");
        console.log("Server is running on port: " + process.env.PORT);
    } catch (err) {
        console.log("Error on connecting to DB: " + (err as any).message);
        process.on("Unhandled rejection", (err, promise) =>
        {
            console.log(`Error : ${err.message}`);
            //close server & exit process
            server.close(() => process.exit(1));
        });
    }
})();

export default server;
