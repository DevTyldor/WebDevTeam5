import type { Request, Response } from "express";
import { CollectionRecord, addRecord, getAllRecords } from "../models/collections/CollectionRecord.js";
import { Shelf, addShelf, getAllShelves, addGameToShelf } from "../models/collections/Shelf.js";
import { getAllGames, getGameTitle } from "../models/collections/Game.js";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const me = "Stefano";

function showCollection(req: Request, res: Response) {
  const records = getAllRecords();
  res.render("collections/collection", { records: records, getGameTitle: getGameTitle });
}

function showAddGamePage(req: Request, res: Response) {
  const games = getAllGames();
  res.render("collections/add-game", { games: games });
}

function handleAddGame(req: Request, res: Response) {
  const id = getAllRecords().length + 1;
  const gameId = Number(req.body.gameId);
  const status = req.body.status;
  const note = req.body.note;

  const record = new CollectionRecord(id, me, gameId, status, 0, 0, note);
  addRecord(record);

  const games = getAllGames();
  res.render("collections/add-game", { games: games, message: "Game toegevoegd" });
}

function getMyRecords() {
  const records = getAllRecords();
  return records.filter(r => r.owner === me);
}

function showShelves(req: Request, res: Response) {
  const shelves = getAllShelves();
  const records = getMyRecords();
  res.render("collections/shelves", { shelves: shelves, records: records, getGameTitle: getGameTitle });
}

function handleAddToShelf(req: Request, res: Response) {
  const shelfId = Number(req.body.shelfId);
  const gameId = Number(req.body.gameId);
  addGameToShelf(shelfId, gameId);

  const shelves = getAllShelves();
  const records = getMyRecords();
  res.render("collections/shelves", { shelves: shelves, records: records, getGameTitle: getGameTitle, message: "Game op shelf gezet" });
}

function showAddShelfPage(req: Request, res: Response) {
  res.render("collections/add-shelf");
}

function handleAddShelf(req: Request, res: Response) {
  const id = getAllShelves().length + 1;
  const name = req.body.name;
  const description = req.body.description;
  const isPublic = req.body.isPublic === "on";

  const shelf = new Shelf(id, me, name, description, isPublic, []);
  addShelf(shelf);

  res.render("collections/add-shelf", { message: "Shelf toegevoegd" });
}

function showShelfPage(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "..", "views", "collections/shelf.html"));
}

function showPublicShelfPage(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, "..", "views", "collections/public-shelf.html"));
}

export {
    showCollection,
    showAddGamePage,
    handleAddGame,
    showShelves,
    handleAddToShelf,
    showAddShelfPage,
    handleAddShelf,
    showShelfPage,
    showPublicShelfPage
}
