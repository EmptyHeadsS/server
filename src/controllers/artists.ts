import { Artist } from "../models/Artist";
import { Request, Response} from "express";

/**
 * POST /createArtists
 * Create alot of artists.
 */
export const addArtists = async (req: Request, res: Response) => {
    const artists: Array<any> = req.body.artists;

    try {
        await Promise.all(
            artists.map((artist) => Artist.create(artist))
        );
        res.status(200).send("success");
    } catch (e) {
        res.status(404).send("fail");
    }
};