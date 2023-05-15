import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Document, Model, model, Schema } from 'mongoose';
import { Roles } from '../types/enums';
import { IStore } from './store';


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: Roles;
    phone: string;
    image: String;
    stores: IStore[];
    createToken: () => string;
    isPasswordsMatched: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: 'user',
        },
        phone: String,
        image: {
            type: String,
            default: 'avatar.jpg',
        },
        stores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Store'
            }
        ],
    },

    {timestamps: true},
);

// Hash password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Check if passwords are matched
userSchema.methods.isPasswordsMatched = async function (
    enteredPassword: string,
) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_KEY!,
    );
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
