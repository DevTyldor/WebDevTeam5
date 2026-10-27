import express from "express";
import type { Request, Response } from 'express';

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/public-shelf", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "collections/public-shelf.html"))
});

router.get("/shelf", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "collections/shelf.html"))
});

router.get("/shelves", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "collections/shelves.html"))
});

export default router;