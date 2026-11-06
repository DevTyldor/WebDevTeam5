import { AppDataSource } from "../data-source.js";
import { Session } from "../models/game sessions/Session.js";
import { Participant } from "../models/game sessions/Participant.js";
import { SessionGame } from "../models/game sessions/SessionGame.js";
import { SessionSignup } from "../models/game sessions/Signup.js";

const sessionRepository = AppDataSource.getRepository(Session);
const sessionSignupRepository = AppDataSource.getRepository(SessionSignup);
const sessionGameRepository = AppDataSource.getRepository(SessionGame);
const participantRepository = AppDataSource.getRepository(Participant);

