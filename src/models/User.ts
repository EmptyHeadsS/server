import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
    location: {
        city: string;
        country: string;
    };
    genres: string[];
};

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    location: {
        city: String,
        country: String
    },
    genres: [String]
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
