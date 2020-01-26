import * as http from "http";
import SocketIO, {Rooms, Socket} from "socket.io";
import app from "./app";
import {generatePlaylists} from "./services/playlist";
import {artists} from "./artifacts/artifacts";

export class SocketServer {
    public io: SocketIO.Server;
    public port: number;
    public genres: Map<string, string>;
    public location: string;

    public constructor() {
        console.log("Socket server constructor");
        this.genres = new Map<string, string>();
        this.location = "";
    }

    public configure(server: http.Server): void {
        this.io = SocketIO(server);
        //this.port = app.get("port");
        console.log("Configuration!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        this.io.on("connection", (socket => this.onConnection(socket)));
        console.log("Configuration DONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }

    private onConnection(socket: Socket): void {
        console.log("ON CONNECTION");
        socket.join("room 001", () => {
            const message: string = "User " + socket.id + "has joined the room";
            console.log(message);
            this.io.to("room 001").emit(message);
        });

        socket.on("disconnect", (room => this.onDisconnection(room, socket)));
        socket.on("genres", (genre => this.onGenreSubmission(genre, socket)));
        socket.on("location", (city => this.onLocationSubmission(city)));
        socket.on("playlist", (() => this.onPlaylistRequest()));
    }

    private onDisconnection(room: string, socket: Socket): void {
        this.io.to(room).emit("User " + socket.id + "has joined the room");
    }

    private onGenreSubmission(genre: string, socket: Socket): void {
        this.genres.has(socket.id) ? this.genres.set(socket.id, genre) : this.genres.set(socket.id, genre);
    }

    private onLocationSubmission(city: string): void {
        this.location = city;
    }

    private onPlaylistRequest(): void {
        const playlist: string = JSON.stringify(artists);
        this.io.to("room 001").emit("playlist", generatePlaylists(JSON.parse(playlist), 10));
    }

}
