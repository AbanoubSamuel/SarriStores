import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, model, Schema } from 'mongoose';

export interface IStore extends Document {
    name: string;
    image: string;
    user: ObjectId;
    createdAt: Date;
}

const storeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Store: Model<IStore> = model<IStore>('Store', storeSchema);
