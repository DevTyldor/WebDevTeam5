import express from "express";
import { showCollection, showAddGamePage, handleAddGame, showShelves, handleAddToShelf, showAddShelfPage, handleAddShelf, showShelfPage, showPublicShelfPage } from "../controllers/collections.controller.js";

const router = express.Router();

router.get("/", showCollection);
router.get("/add-game", showAddGamePage);
router.post("/add-game", handleAddGame);

router.get("/shelves", showShelves);
router.get("/add-shelf", showAddShelfPage);
router.post("/add-shelf", handleAddShelf);
router.post("/add-to-shelf", handleAddToShelf);

router.get("/shelf", showShelfPage);
router.get("/public-shelf", showPublicShelfPage);

export default router;
