import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Session } from "../models/game sessions/Session.js";
import { Participant } from "../models/game sessions/Participant.js";
import { SessionGame } from "../models/game sessions/SessionGame.js";
import { SessionSignup } from "../models/game sessions/Signup.js";

import {
  isNonEmptyString,
  isValidSessionDate,
  isValidSessionTime,
  validateCapacity,
} from "../validators/sessionValidators.js";

const sessionRepository = AppDataSource.getRepository(Session);
const sessionSignupRepository = AppDataSource.getRepository(SessionSignup);
const sessionGameRepository = AppDataSource.getRepository(SessionGame);
const participantRepository = AppDataSource.getRepository(Participant);

async function showCancelSessionPage(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  if (!paramId || !Number.isInteger(paramId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({
    id: paramId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.render("game sessions/cancel-session", { session: session });
}

async function showEditSessionPage(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  if (!paramId || !Number.isInteger(paramId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({
    id: paramId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.render("game sessions/edit-session", { session: session });
}

async function showSessionListPage(req: Request, res: Response) {
  const sessions = await sessionRepository.find({
    relations: {
      signups: true,
      games: true,
    },
  });

  return res.render("game sessions/session-list", { sessions: sessions });
}

async function showSessionCreationpage(req: Request, res: Response) {
  return res.render("game sessions/new-session", {
    error: "",
    form: {
      name: "",
      date: "",
      time: "",
      place: "Club room",
      capacity: "",
    },
  });
}

async function showSessionSignupPage(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  if (!paramId || !Number.isInteger(paramId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({
    id: paramId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.render("game sessions/session-signup", { session: session });
}

async function showViewSessionPage(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  if (!paramId || !Number.isInteger(paramId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({
    id: paramId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.render("game sessions/view-session", { session: session });
}

async function createSession(req: Request, res: Response) {
  let { name, description, host, date, time, place, capacity: unValidatedCapacity } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ message: "invalid name" });
  }

  if (!isNonEmptyString(description)) {
    return res.status(400).json({ message: "invalid description" });
  }

  if (!isNonEmptyString(host)) {
    host = "Hardcoded host";
    //return res.status(400).json({ message: "invalid host" });
  }

  if (!isValidSessionDate(date)) {
    return res.status(400).json({ message: "invalid date" });
  }

  if (!isValidSessionTime(time)) {
    return res.status(400).json({ message: "invalid time" });
  }

  const allowedPlaces = [
    "Club room",
    "Community centre",
    "Library meeting room",
    "Game café",
    "Home",
  ];

  if (!isNonEmptyString(place) || !allowedPlaces.includes(place.trim())) {
    return res.status(400).json({ message: "invalid place" });
  }
  const capacity = validateCapacity(unValidatedCapacity); // returns the actual capacity number or null
  
  if (capacity === null) {
    return res.status(400).json({ message: "invalid capacity" });
  }

  const session = sessionRepository.create({
    name: name.trim(),
    description: description.trim(),
    host: host.trim(),
    date,
    time,
    place: place.trim(),
    capacity,
    status: "Open",
  });

  const savedSession = await sessionRepository.save(session);
  console.log(`Successfully saved session: ${savedSession.name}`);
  return res.status(201).json({ message: `Successfully created session: ${savedSession.name}` });
}

export {
  showCancelSessionPage,
  showEditSessionPage,
  showSessionListPage,
  showSessionSignupPage,
  showViewSessionPage,
  showSessionCreationpage,
  createSession,
};
