import mysql from "mysql2";
import sqlite3 from "sqlite3";
import sqlite from "sqlite";
import SteamID from "steamid";

import { LogEntry } from "logs";
import { Query } from "express-serve-static-core";
import { open } from "sqlite";

import * as config from "./secrets";

abstract class BaseDatabase {
    private _adminQuery: string;
    private _target: string; 

    abstract getRank(steamid: string): Promise<string | undefined>;
    abstract getLogs(query: Query): Promise<LogEntry[]>;

    constructor() {
        let target, table, identifier;

        switch (config.ADMIN_MOD) {
            case "serverguard":
                target = "rank";
                table = "serverguard_users";
                identifier = "steam_id";
                break;

            case "ulx":
                target = "usergroup";
                table = "WUMALookup";
                identifier = "steamid";
                break;

            case "sam":
                target = "rank";
                table = "sam_players";
                identifier = "steamid";
                break;
        }
    
        this._adminQuery = `SELECT ${target} FROM ${table} WHERE ${identifier} = ?;`;
        this._target = target;
    }

    public get adminQuery(): string {
        return this._adminQuery;
    }

    public get target(): string {
        return this._target;
    }

    public userID(input: string): string {
        const steam = new SteamID(input);

        switch (config.ADMIN_MOD) {
            case "serverguard":
            case "ulx":
            case "sam":
                return steam.getSteam2RenderedID();
        }
    }

    public buildQuery(args: Query): string {
        let logQuery = "SELECT * FROM ix_logs";
        let first = true;

        for (const key in args) {
            if (key == "limit") continue;

            if (first) {
                logQuery += ` WHERE ${key}`;
                first = false;
            } else {
                logQuery += ` AND ${key}`;
            }

            const value = mysql.escape(args[key]);

            switch (key) {
                case "string":
                    logQuery += ` LIKE "%${value.replace(/'/g, "")}%"`;
                    break;

                case "before":
                case "after":
                    const timestamp = new Date(value).getTime() / 1000;

                case "before":
                    logQuery += ` < ${timestamp}`;
                    break;

                case "after":
                    logQuery += ` > ${timestamp}`;
                    break;

                default:
                    logQuery += ` = ${value}`;
                    break;
            }
        }

        logQuery += ` ORDER BY id DESC LIMIT ${
            args.limit ? mysql.escape(args.limit).replace(/'/g, "") : 50
        };`;

        return logQuery;
    }
}

export class SqliteDatabase extends BaseDatabase {
    private db: sqlite.Database;

    constructor() {
        super();
    }

    public async setup(): Promise<void> {
        this.db = await open({
            filename: config.SQLITE_PATH,
            driver: sqlite3.cached.Database,
            mode: sqlite3.OPEN_READONLY
        });
    }

    public async getRank(steamid: string): Promise<string | undefined> {
        const result = await this.db.get(this.adminQuery, this.userID(steamid));

        return result[this.target];
    }

    public async getLogs(args: Query): Promise<LogEntry[]> {
        const logQuery = this.buildQuery(args);
        const results = await this.db.all(logQuery);

        return results as LogEntry[];
    }
}

export class MySqlDatabase extends BaseDatabase {
    private pool: mysql.Pool;

    constructor() {
        super();
    }

    public async setup(): Promise<void> {
        this.pool = mysql.createPool({
            user: config.MYSQL_USER,
            password: config.MYSQL_PASS,
            host: config.MYSQL_HOST,
            database: config.MYSQL_DB
        });
    }

    public async getRank(steamid: string): Promise<string | undefined> {
        const promisePool = this.pool.promise();
        const [rows] = await promisePool.query(this.adminQuery, this.userID(steamid));

        const [, result] = Object.entries(rows)[0];

        return result[this.target as keyof typeof result];
    }

    public async getLogs(args: Query): Promise<LogEntry[]> {
        const promisePool = this.pool.promise();
        const logQuery = this.buildQuery(args);

        const [rows] = await promisePool.query(logQuery);

        return rows as LogEntry[];
    }
}