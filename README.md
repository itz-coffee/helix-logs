# Helix Logs
A logger for the Helix roleplaying framework written in Node.js with Typescript.

If you enjoyed my project, consider adding a star ⭐.

# Features
- Steam login
- Usergroup whitelist
- MySQL and SQLite support
- Serverguard and ULX support
- Search filters
  - Messages
  - Before and after dates
  - Steam ID's
  - Character ID's
  - Item ID's
- HTTP and HTTPS support
- Mobile friendly

# Requirements
- [Node.js](https://nodejs.org/en/)
- [Helix](https://github.com/NebulousCloud/helix) updated since May 11th, 2021
- [SQL Helix Plugin](https://github.com/wildflowericecoffee/helix-plugins/tree/main/logger.lua)
- An admin addon. Currently only [Serverguard](https://www.gmodstore.com/market/view/serverguard) and [ULX](https://github.com/TeamUlysses/ulx) are supported

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/wildflowericecoffee/helix-logs.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configuration

Rename the `.env.example` file to `.env` and fill out the environment variables

| Environment Variable                            	| Description                                                                                                            	|
|-------------------------------------------------	|------------------------------------------------------------------------------------------------------------------------	|
| NODE_ENV (production/dev)                       	| Whether we are running in development or production. Enables error logger and sets the domain to localhost in dev.     	|
| SESSION_SECRET                                  	| Secret used for keeping sessions. You should use a random generator for this.                                          	|
| WEBSITE_DOMAIN                                  	| Your website's domain, used for redirecting to steam.                                                                  	|
| PORT                                            	| The port your server listens on.                                                                                       	|
| SSL (true/false)                                	| Whether you want the server to use HTTPS, you will need this if you have your SSL mode to full (strict) in cloudflare. 	|
| SSL_CERT, SSL_KEY                                 | The absolute path of your SSL certificate and key if you are using HTTPS. You can create these with openssl.            |
| DATABASE (mysql/sqlite)                         	| What type of database you have.                                                                                        	|
| SQLITE_PATH                                     	| The path where your sv.db file is located for sqlite.                                                                  	|
| MYSQL_USER, MYSQL_PASS,<br>MYSQL_HOST, MYSQL_DB 	| Login credentials for mysql.                                                                                           	|
| ADMIN_MOD (serverguard/ulx)                     	| The admin mod your server uses, currently only ULX and Serverguard are supported.                                      	|
| STEAM_KEY                                       	| Steam API key, get yours at https://steamcommunity.com/dev/apikey.                                                     	|
| ALLOWED_RANKS                                   	| List of allowed usergroups that can access the server logs, separated by semicolons.                                   	|
- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/).

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

# Deployment
To deploy the app to a web server, simply set it to production and add your own website domain.
> IP addresses work too, but you should use a domain to be able to use Cloudflare's DDoS protection).

SSL is strongly recommended, you can combine Cloudflare's full (strict) HTTPS with a self signed certificate using openssl for full end-to-end encryption.

# Debugging
Type `npm run debug` in your terminal to perform a full build and then server the app in watch mode. `npm run watch` if you are not using static assets.
> VS Code lets you easily run npm scripts from the editor

![i9G14KU 1](https://user-images.githubusercontent.com/36643731/123026088-378b3f00-d3a1-11eb-9dbb-873bf0a7e21e.png)
