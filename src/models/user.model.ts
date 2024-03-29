import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, {Document, Model, model, Schema} from "mongoose";
import {Roles} from "../types/enums";
import {Store} from "./store.model";
import {ObjectId} from "mongodb";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date;
    active: Boolean;
    phone: string;
    stores: ObjectId[];
    package: ObjectId;
    createToken: () => string;
    isPasswordsMatched: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: Roles.USER
        },
        active: {
            type: Boolean,
            default: false
        },
        phone: String,
        stores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Store"
            }
        ],
        package:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Package"
            },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },

    {timestamps: true}
);

// Hash password
userSchema.pre("save", async function (next)
{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.pre("remove", async function (next)
{
    console.log("user pre delete middleware");
    const user = this as any;
    // Delete all stores associated with the user
    await Store.deleteMany({user: user._id});
    next();
});

// Check if passwords are matched
userSchema.methods.isPasswordsMatched = async function (
    enteredPassword: string
)
{
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createToken = function ()
{
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.JWT_KEY!
    );
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
