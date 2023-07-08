import { Document, Model, model, Schema } from 'mongoose';

export interface IBlog extends Document {
    text: string;
    image: string;
    createdAt: Date;
}

const blogSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);
