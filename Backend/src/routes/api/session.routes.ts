import express from "express";
import { getAllSessions, getSession, addSession, editSession, cancelSession, deleteSession } from "../../controllers/api/sessions.controller.js";
const router = express.Router();

router.get("/");
router.get("/:id");

router.post("/new");

router.post("/:id/edit");

router.post("/:id/cancel");

export default router;
