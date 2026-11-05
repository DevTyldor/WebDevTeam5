import express from "express";
import {
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
} from "../controllers/collections.controller.js";

const router = express.Router();

router.get("/", showCollection);
router.get("/add-game", showAddGamePage);
router.post("/add-game", handleAddGame);

router.get("/record/:id", showRecord);
router.post("/record/:id/play", handlePlay);
router.post("/record/:id/rating", handleRating);
router.post("/record/:id/status", handleStatus);
router.get("/delete-record/:id", deleteRecord);

router.get("/shelves", showShelves);
router.get("/add-shelf", showAddShelfPage);
router.post("/add-shelf", handleAddShelf);
router.post("/add-to-shelf", handleAddToShelf);

router.get("/shelf/:id", showShelf);
router.get("/public-shelf/:id", showPublicShelf);
router.get("/delete-shelf/:id", deleteShelf);

export default router;
