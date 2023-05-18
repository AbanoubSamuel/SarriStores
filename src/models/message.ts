import { Document, Model, model, Schema } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    email: string;
    text: string;
    createdAt: Date;
}

const messageSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Message: Model<IMessage> = model<IMessage>('Message', messageSchema);
