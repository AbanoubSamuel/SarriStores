import { Document, Model, model, Schema } from 'mongoose';

export interface IPackage extends Document {
    name: string;
    points: number;
    price: number;
    image: string;
    createdAt: Date;
}

const packageSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Package: Model<IPackage> = model<IPackage>('Package', packageSchema);
