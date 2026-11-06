import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Session } from "../models/game sessions/Session.js";
import { Participant } from "../models/game sessions/Participant.js";
import { SessionGame } from "../models/game sessions/SessionGame.js";
import { SessionSignup } from "../models/game sessions/Signup.js";

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

  return res.render("game sessions/cancel-session");
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

  return res.render("game sessions/edit-session");
}

async function showSessionListPage(req: Request, res: Response) {
  return res.render("game sessions/session-list");
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

  return res.render("game sessions/session-signup");
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

export {
  showCancelSessionPage,
  showEditSessionPage,
  showSessionListPage,
  showSessionSignupPage,
  showViewSessionPage,
};
