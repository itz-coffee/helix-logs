import errorHandler from "errorhandler";
import app from "./app";
import fs from "fs";
import https from "https";
import http from "http";

import * as config from "./util/secrets";

/**
 * Error Handler. Provides full stack
 */
if (config.PROD) {
    app.use(errorHandler());
}


/**
 * Start Express server.
 */

let server: https.Server | http.Server;

if (config.SSL) {
    const key = fs.readFileSync(config.SSL_KEY);
    const cert = fs.readFileSync(config.SSL_CERT);

    server = https.createServer({key: key, cert: cert}, app);
} else {
    server = http.createServer(app);
}

server.listen(app.get("port"), () => {
    console.log(
        `  App is running at ${config.WEBSITE_DOMAIN}:%d in %s mode`,
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
