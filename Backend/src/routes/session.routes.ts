import express from "express";
import { showCancelSessionPage, showEditSessionPage, showSessionListPage, showSessionSignupPage, showViewSessionPage } from "../controllers/sessions.controller.js";

const router = express.Router();

router.get("/", showSessionListPage);

router.get("/view", showViewSessionPage);

router.get("/edit", showEditSessionPage);

router.get("/signup", showSessionSignupPage);

router.get("/cancel", showCancelSessionPage);

export default router;
