import express from "express";
import {
  getAllSessions,
  getSession,
  addSession,
  editSession,
  cancelSession,
  deleteSession,
} from "../../controllers/api/sessions.controller.js";
const router = express.Router();

router.get("/", getAllSessions);
router.get("/:id", getSession);

router.post("/new", addSession);

router.post("/:id/edit", editSession);

router.post("/:id/cancel", cancelSession);

router.post("/:id/delete", deleteSession);

export default router;
