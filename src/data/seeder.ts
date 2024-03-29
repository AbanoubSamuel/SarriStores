import {User} from "../models/user.model";
import mongoose from "mongoose";
import *  as dotenv from "dotenv";
import * as path from "path";
import {Package} from "../models/package.model";
import {About} from "../models/about.model";
import {Policy} from "../models/policy.model";
import * as fs from "fs";


dotenv.config({path: path.resolve(__dirname, `../config/development.env`)});

const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
const aboutUs = JSON.parse(fs.readFileSync("aboutUs.json", "utf-8"));
const packages = JSON.parse(fs.readFileSync("packages.json", "utf-8"));
const policy = JSON.parse(fs.readFileSync("privacyPolicy.json", "utf-8"));
//  Pushing data to db
const pushJsonData = async (data: any, collection: mongoose.Model<any>) =>
{
    await collection.create(data);
};

//Delete all data
const deleteAllModelData = async (collection: mongoose.Model<any>) =>
{
    await collection.deleteMany({});
};

const addAllData = async () =>
{
    try {
        await Promise.all(
            [
                await pushJsonData(users, User),
                await pushJsonData(packages, Package),
                await pushJsonData(aboutUs, About),
                await pushJsonData(policy, Policy),
            ]
        );


        console.log("Added all data successfully");
    } catch (err) {
        console.log(`Error while seeding data ${err}`);
        process.exit(1);
    }

};

const removeAllData = async () =>
{
    try {
        await deleteAllModelData(User);
        console.log("all data is deleted");
    } catch (err) {
        console.log(`Error while deleting data ${err}`);
        process.exit(1);
    }
};

(async () =>
{
    const operation = process.argv[2];
    try {
        if (operation === "i") {
            await mongoose.connect(process.env.MONGO_URI!);
            await addAllData();
        }
        if (operation === "d") {
            await mongoose.connect(process.env.MONGO_URI!);
            await removeAllData();
        }
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
})();