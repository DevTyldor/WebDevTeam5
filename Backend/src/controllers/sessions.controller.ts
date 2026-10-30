import type { Request, Response } from "express";

function showCancelSessionPage(req: Request, res: Response) {
  return res.render("cancel-session");
}

function showEditSessionPage(req: Request, res: Response) {
  return res.render("edit-session");
}

function showSessionListPage(req: Request, res: Response) {
  return res.render("session-list");
}

function showSessionSignupPage(req: Request, res: Response) {
  return res.render("session-signup");
}

function showViewSessionPage(req: Request, res: Response) {
  return res.render("view-session");
}

export {
    showCancelSessionPage,
    showEditSessionPage,
    showSessionListPage,
    showSessionSignupPage,
    showViewSessionPage
}