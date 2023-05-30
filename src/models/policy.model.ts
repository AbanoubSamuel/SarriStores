import {Document, Model, model, Schema} from "mongoose";

export interface IPolicy extends Document {
    paragraph: string;
    createdAt: Date;
}

const policySchema = new Schema({
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

export const Policy: Model<IPolicy> = model<IPolicy>("Policy", policySchema);
