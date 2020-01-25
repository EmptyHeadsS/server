import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
    location: string;
    genres: string[];
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    location: String,
    genres: String
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
