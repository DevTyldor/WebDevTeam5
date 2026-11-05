import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { CollectionRecord } from "../models/collections/CollectionRecord.js";
import { Shelf } from "../models/collections/Shelf.js";
import { ShelfGame } from "../models/collections/ShelfGame.js";
import { getAllGames, getGameTitle } from "../models/collections/Game.js";

const recordRepository = AppDataSource.getRepository(CollectionRecord);
const shelfRepository = AppDataSource.getRepository(Shelf);
const shelfGameRepository = AppDataSource.getRepository(ShelfGame);

const me = "Stefano";

async function countInProgress() {
  const inProgress = await recordRepository.find({
    where: { owner: me, status: "In progress" },
  });
  return inProgress.length;
}

async function renderCollection(res: Response, message: string) {
  const records = await recordRepository.find({ where: { owner: me } });
  res.render("collections/collection", {
    records: records,
    getGameTitle: getGameTitle,
    message: message,
  });
}

async function renderShelves(res: Response, message: string) {
  const shelves = await shelfRepository.find({ where: { owner: me } });
  const records = await recordRepository.find({ where: { owner: me } });
  const shelfGames = await shelfGameRepository.find();
  res.render("collections/shelves", {
    shelves: shelves,
    records: records,
    shelfGames: shelfGames,
    getGameTitle: getGameTitle,
    message: message,
  });
}

function renderRecord(res: Response, record: CollectionRecord | null, message: string) {
  res.render("collections/record", {
    record: record,
    getGameTitle: getGameTitle,
    message: message,
  });
}

async function showCollection(req: Request, res: Response) {
  await renderCollection(res, "");
}

function showAddGamePage(req: Request, res: Response) {
  const games = getAllGames();
  res.render("collections/add-game", { games: games });
}

async function handleAddGame(req: Request, res: Response) {
  const gameId = Number(req.body.gameId);
  const status = req.body.status;
  const note = req.body.note;
  const games = getAllGames();

  const existing = await recordRepository.findOneBy({ owner: me, gameId: gameId });
  if (existing) {
    res.render("collections/add-game", { games: games, message: "This game is already in your collection" });
    return;
  }

  const inProgress = await countInProgress();
  if (status === "In progress" && inProgress >= 3) {
    res.render("collections/add-game", { games: games, message: "You already have 3 games in progress" });
    return;
  }

  const newRecord = recordRepository.create({
    owner: me,
    gameId: gameId,
    status: status,
    plays: 0,
    rating: 0,
    note: note,
  });
  const savedRecord = await recordRepository.save(newRecord);
  console.log(`New record saved with id ${savedRecord.id}`);

  res.render("collections/add-game", { games: games, message: "Game added" });
}

async function showRecord(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const record = await recordRepository.findOneBy({ id: paramId, owner: me });
  renderRecord(res, record, "");
}

async function handlePlay(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const record = await recordRepository.findOneBy({ id: paramId, owner: me });
  if (!record) {
    renderRecord(res, null, "");
    return;
  }

  record.plays = record.plays + 1;
  if (record.plays === 1) {
    record.status = "Played";
  }
  await recordRepository.save(record);

  renderRecord(res, record, "Play added");
}

async function handleRating(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const rating = Number(req.body.rating);
  const record = await recordRepository.findOneBy({ id: paramId, owner: me });
  if (!record) {
    renderRecord(res, null, "");
    return;
  }

  if (record.status !== "Played") {
    renderRecord(res, record, "You can only rate a played game");
    return;
  }

  if (rating < 1 || rating > 5) {
    renderRecord(res, record, "Rating must be between 1 and 5");
    return;
  }

  record.rating = rating;
  await recordRepository.save(record);

  renderRecord(res, record, "Rating saved");
}

async function handleStatus(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const status = req.body.status;
  const record = await recordRepository.findOneBy({ id: paramId, owner: me });
  if (!record) {
    renderRecord(res, null, "");
    return;
  }

  const inProgress = await countInProgress();
  const alreadyInProgress = record.status === "In progress";
  if (status === "In progress" && !alreadyInProgress && inProgress >= 3) {
    renderRecord(res, record, "You already have 3 games in progress");
    return;
  }

  record.status = status;
  await recordRepository.save(record);

  renderRecord(res, record, "Status changed");
}

async function deleteRecord(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const record = await recordRepository.findOneBy({ id: paramId, owner: me });
  if (!record) {
    await renderCollection(res, "Game not found");
    return;
  }

  const shelves = await shelfRepository.find({ where: { owner: me } });
  for (const shelf of shelves) {
    await shelfGameRepository.delete({ shelfId: shelf.id, gameId: record.gameId });
  }
  await recordRepository.delete({ id: paramId });

  await renderCollection(res, "Game removed from collection");
}

async function showShelves(req: Request, res: Response) {
  await renderShelves(res, "");
}

async function handleAddToShelf(req: Request, res: Response) {
  const shelfId = Number(req.body.shelfId);
  const gameId = Number(req.body.gameId);

  const shelf = await shelfRepository.findOneBy({ id: shelfId, owner: me });
  if (!shelf) {
    await renderShelves(res, "Shelf not found");
    return;
  }

  const existing = await shelfGameRepository.findOneBy({ shelfId: shelfId, gameId: gameId });
  if (existing) {
    await renderShelves(res, "Game is already on this shelf");
    return;
  }

  const newShelfGame = shelfGameRepository.create({ shelfId: shelfId, gameId: gameId });
  await shelfGameRepository.save(newShelfGame);

  await renderShelves(res, "Game added to shelf");
}

function showAddShelfPage(req: Request, res: Response) {
  res.render("collections/add-shelf");
}

async function handleAddShelf(req: Request, res: Response) {
  const name = req.body.name;
  const description = req.body.description;
  const isPublic = req.body.isPublic === "on";

  const newShelf = shelfRepository.create({
    owner: me,
    name: name,
    description: description,
    isPublic: isPublic,
  });
  const savedShelf = await shelfRepository.save(newShelf);
  console.log(`New shelf saved with id ${savedShelf.id}`);

  res.render("collections/add-shelf", { message: "Shelf added" });
}

async function showShelf(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const shelf = await shelfRepository.findOneBy({ id: paramId, owner: me });
  const shelfGames = await shelfGameRepository.find({ where: { shelfId: paramId } });

  res.render("collections/shelf", {
    shelf: shelf,
    shelfGames: shelfGames,
    getGameTitle: getGameTitle,
  });
}

async function showPublicShelf(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const shelf = await shelfRepository.findOneBy({ id: paramId, isPublic: true });
  const shelfGames = await shelfGameRepository.find({ where: { shelfId: paramId } });

  res.render("collections/public-shelf", {
    shelf: shelf,
    shelfGames: shelfGames,
    getGameTitle: getGameTitle,
  });
}

async function deleteShelf(req: Request, res: Response) {
  const paramId = Number(req.params.id);
  const shelf = await shelfRepository.findOneBy({ id: paramId, owner: me });
  if (!shelf) {
    await renderShelves(res, "Shelf not found");
    return;
  }

  await shelfGameRepository.delete({ shelfId: paramId });
  await shelfRepository.delete({ id: paramId });

  await renderShelves(res, "Shelf deleted");
}

export {
    showCollection,
    showAddGamePage,
    handleAddGame,
    showRecord,
    handlePlay,
    handleRating,
    handleStatus,
    deleteRecord,
    showShelves,
    handleAddToShelf,
    showAddShelfPage,
    handleAddShelf,
    showShelf,
    showPublicShelf,
    deleteShelf
}
