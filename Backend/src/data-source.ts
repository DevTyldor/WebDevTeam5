import { DataSource } from "typeorm";
import "reflect-metadata";


import { Session } from "./models/game sessions/Session.js";
import { SessionGame } from "./models/game sessions/SessionGame.js";
import { SessionSignup } from "./models/game sessions/Signup.js";
import { Participant } from "./models/game sessions/Participant.js";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        Session,
        SessionGame,
        SessionSignup,
        Participant
    ] // add wishlist, collections & lending entities.
});