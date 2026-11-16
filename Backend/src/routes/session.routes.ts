import express from "express";
import { showCancelSessionPage, showEditSessionPage, showSessionListPage, showSessionSignupPage, showViewSessionPage, showSessionCreationpage, createSession, updateSession, deleteSession, cancelSession } from "../controllers/sessions.controller.js";

const router = express.Router();

router.get("/", showSessionListPage);

router.get("/new", showSessionCreationpage);
router.post("/new", createSession);

router.get("/:id", showViewSessionPage);

router.get("/:id/edit", showEditSessionPage);
router.put("/:id/edit", updateSession);

router.get("/:id/signup", showSessionSignupPage);

router.get("/:id/cancel", showCancelSessionPage);
router.post("/:id/cancel", cancelSession);

export default router;
