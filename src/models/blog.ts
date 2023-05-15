import { Document, Model, model, Schema } from 'mongoose';

export interface IBlog extends Document {
    name: string;
    paragraph:string;
    createdAt: Date;
}

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    paragraph: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Store: Model<IBlog> = model<IBlog>('Store', blogSchema);
