import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js"
import { Session } from "../../models/game sessions/Session.js";
import { Participant } from "../../models/game sessions/Participant.js";
import { SessionGame } from "../../models/game sessions/SessionGame.js";
import { SessionSignup } from "../../models/game sessions/Signup.js";

import {
  isNonEmptyString,
  isValidSessionDate,
  isValidSessionTime,
  validateCapacity,
} from "../../validators/sessionValidators.js";

const sessionRepository = AppDataSource.getRepository(Session);

export async function getAllSessions(req: Request, res: Response){

}

export async function getSession(req: Request, res: Response){

}

export async function addSession(req: Request, res: Response){

}

export async function editSession(req: Request, res: Response){

}

export async function cancelSession(req: Request, res: Response){

}

export async function deleteSession(req: Request, res: Response){

}