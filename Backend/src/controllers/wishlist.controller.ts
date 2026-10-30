import type { Request, Response } from "express";

function showWishlistPage(req: Request, res: Response) {
  return res.render("wishlist/wishlist");
}

export {showWishlistPage}