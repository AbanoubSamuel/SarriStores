import { Document, Model, model, Schema } from 'mongoose';

export interface IBlog extends Document {
    name: string;
    text: string;
    createdAt: Date;
}

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);
