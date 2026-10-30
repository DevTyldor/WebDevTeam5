import express from "express";
import path from "node:path";
import type { Request, Response, NextFunction } from 'express';
import sessionRouter from './routes/session.routes.js';

import collectionRouter from "./routes/collection.routes.js"
import wishlistRouter from "./routes/wishlist.routes.js"

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next(); // without this, the request would stop here
})

app.use("/collections", collectionRouter)
app.use("/wishlist", wishlistRouter)
app.use("/sessions", sessionRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello! Welcome to my Express + TypeScript server");
});


app.use((req: Request, res: Response) => {
    res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});