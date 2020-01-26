import { Artist } from "../models/Artist";
import { Request, Response} from "express";
import { User } from "../models/User";

import { generatePlaylist } from "../services/playlist";

/**
 * GET /playlist?username=username&size=playlistSize
 * Create alot of artists.
 */
export const getPlaylist = async (req: Request, res: Response) => {
    const username = req.query.username;
    const playlistSize = req.query.size;

    try {
        const user = await User.findOne({username});
        const city = user.location.city;
        const country = user.location.country;

        const localArtists = await Artist.find({city, country});
        const playlist = await generatePlaylist(localArtists, playlistSize);
        res.status(200).json(playlist);
    } catch (e) {
        res.status(404).send("Error while generating the playlist.");
        console.log(e);
    }
};