import "reflect-metadata";
import { DataSource } from "typeorm";



import { Session } from "./models/game sessions/Session.js";
import { SessionGame } from "./models/game sessions/SessionGame.js";
import { SessionSignup } from "./models/game sessions/Signup.js";
import { Participant } from "./models/game sessions/Participant.js";

import { CollectionRecord } from "./models/collections/CollectionRecord.js";
import { Shelf } from "./models/collections/Shelf.js";
import { ShelfGame } from "./models/collections/ShelfGame.js";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        Session,
        SessionGame,
        SessionSignup,
        Participant,
        CollectionRecord,
        Shelf,
        ShelfGame
    ] // add wishlist & lending entities.
});