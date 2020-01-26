import { ArtistInterface } from "../models/Artist";
import * as spotify from "./spotify";

const randInt = (lower: number, upper: number) => {
    return Math.floor(Math.random() * upper) + lower;
};
// Gets information from
export const generatePlaylists = async (
    localArtists: ArtistInterface[],
    playlistSize?: number
) => {
    playlistSize = playlistSize === undefined ? 30 : playlistSize;
    const playlistPlan = new Map();
    for (let index = 0; index < playlistSize; index++) {
        const artistName = localArtists[randInt(0, playlistSize - 1)].name;
        if (playlistPlan.has(artistName)) {
            playlistPlan.set(artistName, 1);
        } else {
            playlistPlan.set(artistName, playlistPlan.get(artistName) + 1);
        }
    }
    const songPromises: Array<Promise<Array<spotify.Song>>> = [];
    // Will not work, need to concat in a different way
    for (const [artistName, num] of playlistPlan) {
        songPromises.concat(spotify.getSongsByArtist(artistName, num as number));
    }
    return Promise.all(songPromises);
};
