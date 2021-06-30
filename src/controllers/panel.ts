import { Request, Response } from "express";

import { LogEntry } from "../types/logs";

import * as config from "../util/secrets";

import { database } from "../app";

/**
 * Logs panel.
 * @route GET /panel
 */
export const index = async (req: Request, res: Response): Promise<void> => {
    const rank = await database.getRank(req.user.id);

    if (!rank) {
        res.status(403).send("You need to join the server first!");
        return;
    }

    if (!config.ALLOWED_RANKS.includes(rank)) {
        res.status(403).send(
            `Your rank (${rank}) is not allowed to see this page.
            The allowed ranks are: ${config.ALLOWED_RANKS.join(", ")}.`
        );
        return;
    }

    const logs: LogEntry[] = await database.getLogs(req.query);

    res.render("panel", {
        user: req.user,
        logs: logs,
        rank: rank
    });
};

