import express from "express";
import type { Request, Response } from 'express';

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/wishlist", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "wishlist/wishlist.html"))
});

export default router;