import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { database } from "../app";
import "../config/passport";

export const passportAuth = passport.authenticate("steam", { failureRedirect: "/" });
export const keepOriginal = (req: Request, _res: Response, next: NextFunction): void => {
  req.url = req.originalUrl;
  next();
};

export const postLogin = async(req: Request): Promise<void> => {
  const rank = await database.getRank(req.user.id);
  req.session.rank = rank;
};