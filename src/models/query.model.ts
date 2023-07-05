import {Document, Model, model, Schema} from "mongoose";

export interface IQuery extends Document {
    company: string;
    name: string;
    email: string;
    package: string;
    phone: string;
    createdAt: Date;
}

const querySchema = new Schema({
    company: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    package: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Query: Model<IQuery> = model<IQuery>("Query", querySchema);
