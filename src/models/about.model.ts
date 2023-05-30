import {Document, Model, model, Schema} from "mongoose";

export interface IAbout extends Document {
    paragraph: string;
    createdAt: Date;
}

const aboutSchema = new Schema({
    paragraph: {
        type: String,
        default: "Policy",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const About: Model<IAbout> = model<IAbout>("About", aboutSchema);
