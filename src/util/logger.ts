import winston from "winston";
import { PROD } from "./secrets";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: PROD ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (!PROD) {
    logger.debug("Logging initialized at debug level");
}

export default logger;
