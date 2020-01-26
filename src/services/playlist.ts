import { ArtistInterface } from "../models/Artist";
import * as spotify from "./spotify";
import * as _ from "lodash";

const randInt = (lower: number, upper: number) => {
    return Math.floor(Math.random() * upper) + lower;
};
// Gets information from
export const generatePlaylist = async (
    localArtists: ArtistInterface[],
    playlistSize?: number
) => {
    playlistSize = playlistSize === undefined ? 30 : playlistSize;
    const playlistPlan = new Map();
    for (let index = 0; index < playlistSize; index++) {
        const artistName = localArtists[randInt(0, playlistSize - 1)].name;
        if (!playlistPlan.has(artistName)) {
            playlistPlan.set(artistName, 1);
        } else {
            playlistPlan.set(artistName, playlistPlan.get(artistName) + 1);
        }
    }

    const songPromises: Array<Promise<Array<spotify.Song>>> = [];
    // Will not work, need to concat in a different way
    for (const [artistName, num] of playlistPlan) {
        songPromises.push(spotify.getSongsByArtist(artistName, num as number));
    }
    const bumpyPlaylist = await Promise.all(songPromises);
    return _.flatMap(bumpyPlaylist);
};
