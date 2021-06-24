import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response): void => {
    res.render("home", {
        user: req.user,
        rank: req.session.rank
    });
};
