import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import type { Request, Response } from "express";

const router = express.Router();

router.get("/sessions", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views/game sessions", "session-list.html"));
});

router.get("/view-session", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views/game sessions", "view-session.html"));
});

router.get("/edit-session", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views/game sessions", "edit-session.html"));
});

router.get("/session-signup", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views/game sessions", "session-signup.html"));
});

router.get("/cancel-session", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "views/game sessions", "cancel-session.html"));
});

export default router;
