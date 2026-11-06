import express from "express";
import { showCancelSessionPage, showEditSessionPage, showSessionListPage, showSessionSignupPage, showViewSessionPage, showSessionCreationpage, createSession } from "../controllers/sessions.controller.js";

const router = express.Router();

router.get("/", showSessionListPage);

router.get("/new", showSessionCreationpage);
router.post("/new", createSession);

router.get("/:id/view", showViewSessionPage);

router.get("/:id/edit", showEditSessionPage);

router.get("/:id/signup", showSessionSignupPage);

router.get("/:id/cancel", showCancelSessionPage);

export default router;
