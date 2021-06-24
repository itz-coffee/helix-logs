import { Request, Response } from "express";

/**
 * Shows steam account information.
 * @route GET /account
 */
export const account = (req: Request, res: Response): void => {
    res.render("account", {
        user: req.user
    });
};

/**
 * Logs out steam account.
 * @route GET /logout
 */
export const logout = (req: Request, res: Response): void => {
    req.logOut();
    res.redirect("/");
};
