import { NextFunction, Request, Response } from "express";
import passport from "passport";
import passportSteam from "passport-steam";
import { WEBSITE_DOMAIN, STEAM_KEY } from "../util/secrets";

const SteamStrategy = passportSteam.Strategy;
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/");
};

passport.serializeUser((user, done): void => {
    done(null, user);
});

passport.deserializeUser((obj, done): void => {
    done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: `${WEBSITE_DOMAIN}/auth/steam/return`,
    realm: WEBSITE_DOMAIN,
    apiKey: STEAM_KEY
}, (identifier: never, profile: { identifier: never; }, done: (arg0: never, arg1: never) => never): void => {
    process.nextTick(() => {
        profile.identifier = identifier;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return done(null, profile);
    });
}));