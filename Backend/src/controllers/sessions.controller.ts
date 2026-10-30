import type { Request, Response } from "express";

function showCancelSessionPage(req: Request, res: Response) {
  return res.render("game sessions/cancel-session");
}

function showEditSessionPage(req: Request, res: Response) {
  return res.render("game sessions/edit-session");
}

function showSessionListPage(req: Request, res: Response) {
  return res.render("game sessions/session-list");
}

function showSessionSignupPage(req: Request, res: Response) {
  return res.render("game sessions/session-signup");
}

function showViewSessionPage(req: Request, res: Response) {
  return res.render("game sessions/view-session");
}

export {
    showCancelSessionPage,
    showEditSessionPage,
    showSessionListPage,
    showSessionSignupPage,
    showViewSessionPage
}