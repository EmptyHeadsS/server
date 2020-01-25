import { Artist, ArtistInterface } from "../models/Artist";

const getSongsByArtist = (artistName: string, num: number) => {
    return [];
};

const randInt = (lower: number, upper: number) => {
    return Math.floor(Math.random() * upper) + lower;
};
// Gets information from
export const generatePlaylists = async (
    localArtists: ArtistInterface[],
    playlistSize?: number
) => {
    playlistSize = playlistSize === undefined ? 30 : playlistSize;
    const playlistPlan = {};
    for (let index = 0; index < playlistSize; index++) {
        const artistName = localArtists[randInt(0, playlistSize - 1)].name;
        if (playlistPlan[artistName] === undefined) {
            playlistPlan[artistName] = 1;
        } else {
            playlistPlan[artistName]++;
        }
    }
    const songPromises = [];
    for (const [artistName, num] of Object.entries(playlistPlan)) {
        songPromises.concat(getSongsByArtist(artistName, num as number));
    }
    return Promise.all(songPromises);
};