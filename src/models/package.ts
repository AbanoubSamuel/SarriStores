import { Document, Model, model, Schema } from 'mongoose';

export interface IPackage extends Document {
    name: string;
    points: string;
    price: number;
    createdAt: Date;
}

const storeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'avatar.jpg',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Store: Model<IPackage> = model<IPackage>('Package', storeSchema);
