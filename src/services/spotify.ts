import axios from "axios";
import * as qs from "querystring";
// import * as countries from "alpha2-countries";

export interface Song {
    name: string;
    id: string;
}

async function* bearerToken() {
    let token = undefined;
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic ZDI4NDM5NjBhODQ4NDgyNzk5YjMzMTVkNmE4ZjA4Zjg6YTZiNDEzMWI5NjRkNDVhMWFhNWVlM2M3MDI3MTg0Yzg="
        }
    };
    const body = {
        "grant_type": "client_credentials"
    };

    while (true) {
        if (token === undefined) {
            try {
                const res = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    qs.stringify(body),
                    config
                );
                console.log(res);
                token = res.data.access_token;
            } catch (e) {
                console.log(e);
            }
        }
        yield token;
    }
}

export const getSongsByArtist = async (artistName: string, num: number) => {
    // Request config setup
    const token = (await bearerToken().next()).value;
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    // Search query to get artist by name
    const searchUrl = "https://api.spotify.com/v1/search";
    const searchURLQuerry = `${searchUrl}?q=${artistName}&type=artist&limit=1`;
    const searchResults = await axios.get(
        searchURLQuerry,
        config
    );
    const artist = searchResults.data.artists.items[0];
    const artistId = artist.uri.split(":")[2];

    // Querry to get top 5 songs from artists
    const topUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=CA`;
    const topResults = await axios.get(
        topUrl,
        config
    );
    const topSongs = topResults.data.tracks;
    return topSongs.map((song: any) => ({
        name: song.name,
        id: song.uri.split(":")[2]
    })).slice(0, num);
};