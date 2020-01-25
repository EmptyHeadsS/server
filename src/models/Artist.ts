import mongoose from "mongoose";

export interface ArtistInterface {
    city: string;
    country: string;
    name: string;
    genre: string;
}
export type ArtistDocument = mongoose.Document & ArtistInterface

const artistSchema = new mongoose.Schema({
    city: String,
    country: String,
    name: String,
    genre: String,
}, { timestamps: true });

export const Artist = mongoose.model<ArtistDocument>("Artist", artistSchema);
