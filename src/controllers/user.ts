import { User} from "../models/User";
import { Request, Response} from "express";

/**
 * POST /login
 * Sign in using email and password.
 */
export const login = async (req: Request, res: Response) => {
    const {username, password, _} = req.body;
    try {
        const existing = await User.findOne({username: username}).exec();
        if (existing.password == password) {
            res.status(200);
            res.json({
                message: "User successfully logged in"
            });
        } else {
            res.status(400).send("Password is incorrect");
        }

    } catch (e) {
        res.status(404).send("USer does not exist.");
    }
};

/**
 * POST /createUser
 * Create User Page.
 */
export const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const {username, password, location, genres} = req.body;
    try {
        const newUser = await User.create({
            username,
            password,
            location,
            genres
        });
        res.status(202).json(newUser);
    } catch (e) {
        res.status(500).send("Incorrect user format.");
        console.log(e);
    }
};

/**
 * POST /updateLocation
 * Update user location.
 */
export const updateLocation = async (req: Request, res: Response) => {
    const {username, location} = req.body;
    try {
        const updatedUser = await User.updateOne({username}, {location}).exec();
        res.status(202).json(updatedUser);
    } catch (e) {
        res.status(500).send("Incorrect user format.");
    }
};