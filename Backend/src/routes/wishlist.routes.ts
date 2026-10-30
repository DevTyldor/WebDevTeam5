import express from "express";
import { showWishlistPage } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", showWishlistPage);

export default router;