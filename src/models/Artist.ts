import mongoose from "mongoose";

export type ArtistDocument = mongoose.Document & {
    city: string;
    country: string;
    name: string;
    genre: string;
};

const artistSchema = new mongoose.Schema({
    city: String,
    country: String,
    name: String,
    genre: String,
}, { timestamps: true });

export const Artist = mongoose.model<ArtistDocument>("Artist", artistSchema);
