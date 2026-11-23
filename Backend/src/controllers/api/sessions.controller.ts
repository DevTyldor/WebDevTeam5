import type { Request, Response } from "express";
import { AppDataSource } from "../../data-source.js";
import { Session } from "../../models/game sessions/Session.js";

import {
  isNonEmptyString,
  isValidSessionDate,
  isValidSessionTime,
  validateCapacity,
} from "../../validators/sessionValidators.js";

const sessionRepository = AppDataSource.getRepository(Session);

export async function getAllSessions(req: Request, res: Response) {
  const sessions = await sessionRepository.find({
    relations: {
      signups: true,
      games: true,
    },
  });

  res.status(200).json(sessions);
}

export async function getSession(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  if (!paramId || !Number.isInteger(paramId)) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOne({
    where: { id: paramId },
    relations: {
      games: true,
      signups: {
        game: true,
      },
    },
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.status(200).json(session);
}

export async function addSession(req: Request, res: Response) {
  let {
    name,
    description,
    host,
    date,
    time,
    place,
    capacity: unValidatedCapacity,
  } = req.body ?? {};

  if (!isNonEmptyString(name)) {
    return res.status(400).json({ message: "invalid name" });
  }

  if (!isNonEmptyString(description)) {
    return res.status(400).json({ message: "invalid description" });
  }

  // in the future this will automatically set the host as the current authenticated member.
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
  const capacity = validateCapacity(unValidatedCapacity);

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
    status: "open",
  });

  const savedSession = await sessionRepository.save(session);
  console.log(`Successfully saved session: ${savedSession.name}`);
  return res
    .status(201)
    .json({ message: `Successfully created session: ${savedSession.name}` });
}

export async function editSession(req: Request, res: Response) {
  const paramId = Number(req.params.id);

  if (!Number.isInteger(paramId) || paramId <= 0) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  let {
    host,
    date,
    time,
    place,
    capacity: unValidatedCapacity,
  } = req.body ?? {};

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
  const capacity = validateCapacity(unValidatedCapacity);

  if (capacity === null) {
    return res.status(400).json({ message: "invalid capacity" });
  }

  const session = await sessionRepository.findOneBy({ id: paramId });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  if (session.status === "cancelled") {
    return res
      .status(403)
      .json({ message: "You are unauthorized to edit a cancelled session." });
  }

  await sessionRepository.update(paramId, {
    host: host.trim(),
    date,
    time,
    place: place.trim(),
    capacity,
  });

  return res.status(200).json({
    message: `Successfully updated session: ${session.name.trim()}`,
  });
}

export async function cancelSession(req: Request, res: Response) {
  const paramId = Number(req.params.id);

  if (!Number.isInteger(paramId) || paramId <= 0) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({ id: paramId });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  await sessionRepository.update(paramId, {
    status: "cancelled",
  });

  return res.status(200).json({
    message: `Successfully cancelled session: ${session.name.trim()}`,
  });
}

export async function deleteSession(req: Request, res: Response) {
  const paramId = Number(req.params.id);

  if (!Number.isInteger(paramId) || paramId <= 0) {
    return res.status(400).json({ message: "Invalid session ID" });
  }

  const session = await sessionRepository.findOneBy({ id: paramId });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  // todo: finish implementation
}
