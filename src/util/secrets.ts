import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

const env = process.env;

export const ENVIRONMENT = env.NODE_ENV;
export const PROD = env.NODE_ENV === "production";
export const SESSION_SECRET = env.SESSION_SECRET;
export const SSL = (env.SSL === "true");
export const WEBSITE_DOMAIN = (SSL ? "https://" : "http://") + (PROD ? env.WEBSITE_DOMAIN : "localhost");
export const SSL_CERT = env.SSL_CERT;
export const SSL_KEY = env.SSL_KEY;
export const DATABASE = env.DATABASE;
export const SQLITE_PATH = env.SQLITE_PATH;
export const MYSQL_USER = env.MYSQL_USER;
export const MYSQL_PASS = env.MYSQL_PASS;
export const MYSQL_HOST = env.MYSQL_HOST;
export const MYSQL_DB = env.MYSQL_DB;
export const ADMIN_MOD = env.ADMIN_MOD;
export const STEAM_KEY = env.STEAM_KEY;
export const ALLOWED_RANKS = env.ALLOWED_RANKS.split(";");