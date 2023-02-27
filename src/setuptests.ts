import fs from "fs";

// Create a sqlite database if one doesn't exist
if (!fs.existsSync("sv.db")) {
    fs.writeFileSync("sv.db", "");
}