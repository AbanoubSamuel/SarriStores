import {Document, Model, model, Schema} from 'mongoose';

export interface IStore extends Document {
    name: string;
    image: string;
    createdAt: Date;
}

const storeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: false
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Store: Model<IStore> = model<IStore>('Store', storeSchema);
