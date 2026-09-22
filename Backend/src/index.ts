import express from "express";
import type { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello! Welcome to my Express + TypeScript server");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});