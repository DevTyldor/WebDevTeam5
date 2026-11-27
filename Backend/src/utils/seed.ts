import { AppDataSource } from "../data-source.js";
import { Session } from "../models/game_sessions/Session.js";
//import { Participant } from "../models/game sessions/Participant.js";
import { SessionGame } from "../models/game_sessions/SessionGame.js";
import { SessionSignup } from "../models/game_sessions/Signup.js";

const sessionRepository = AppDataSource.getRepository(Session);
const sessionSignupRepository = AppDataSource.getRepository(SessionSignup);
const sessionGameRepository = AppDataSource.getRepository(SessionGame);
//const participantRepository = AppDataSource.getRepository(Participant); // not sure if this is needed for now.

export async function seedGameSessions() {
  const count = await sessionRepository.count();
  if (count > 0) {
    return;
  }

  
}
