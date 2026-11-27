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

  const seedSessions = [
    {
      name: "Catan Night",
      description:
        "Casual evening of Settlers of Catan. Beginners are welcome and the rules will be explained.",
      host: "Alice",
      date: "2026-12-04",
      time: "19:00",
      place: "Game café",
      capacity: 4,
    },
    {
      name: "Beginner Chess Workshop",
      description:
        "Learn openings and basic tactics, then play practice games against other members.",
      host: "Bram",
      date: "2026-12-08",
      time: "18:30",
      place: "Library meeting room",
      capacity: 8,
    },
    {
      name: "Sunday D&D One-Shot",
      description:
        "A self-contained fantasy adventure for new and experienced players. Pregenerated characters are provided.",
      host: "Chloe",
      date: "2026-12-13",
      time: "14:00",
      place: "Club room",
      capacity: 5,
    },
    {
      name: "Board Game Potluck",
      description:
        "Bring a game and a snack to share. We'll play a mix of party and strategy games at a relaxed pace.",
      host: "Daan",
      date: "2026-12-19",
      time: "17:00",
      place: "Community centre",
      capacity: 12,
    },
  ];

  for(let session of seedSessions){
    let created = await sessionRepository.create(session);
    sessionRepository.save(created);
    console.log(`[seed.ts]: Successfully created session ${session.name}`);
  }
}
