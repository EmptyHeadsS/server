import mongoose from "mongoose";

export interface ArtistInterface {
    city: string;
    country: string;
    name: string;
    genres: string[];
}
export type ArtistDocument = mongoose.Document & ArtistInterface

const artistSchema = new mongoose.Schema({
    city: String,
    country: String,
    name: String,
    genres: [String],
}, { timestamps: true });

export const Artist = mongoose.model<ArtistDocument>("Artist", artistSchema);
