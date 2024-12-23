const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || "FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENrNjlZMUlMeVdDK3VDd0ZnQkNPZHdRQ1FkRXY5RFZaWHBPZ1pGbG9WTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTjQ1NWJUZlRwcXJ2MFJISGJjQWlubTlQUDRzeXdnQTV5d2tSdVZXYWtpYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTXVXY2t3cWxJZEhBNlZ0KzB2RVlvbXgzbDdEcGE3MWlPcVhxdGM0S25FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSODdSNXlKVkhSWUtTN2ViUXV4RzBvRFp3czFPWGNyUzQveWl6cVNwdEI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFNdytiZXIwYkRTMkdLVEZreEczcUtOalQxYzR3aU44eENMNzlxM05WbFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1yQU9VRHppaVNBWXVrVEREaHFZYW90WnpId21JRE9KS1N4OE9zZnNMeFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0lVNFlVQmFlNi93VjJMUFd3UjMrT3ViVVlNOW5sVnJVTVk4bDl5NVNFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2hZK0IxOW9SSDlOeEsxQnJoZW9YUjNMN2dSc2p0QnJRQzQ0T3UyN1R5WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYvNCtxbVB5TTN5WkxEK1Z0VVJPQUdLbGZ4RW52Rk9qaTg0MTQyT1RGdzJKQjVGa1k2QlUybXBvR3JnYUZWZzgzOVJxRE1DK3VFandubVYrL0F5emhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiI3L3pwZElnSjBqd2VpM0xycnd2emlnUEdBeitJRGJyU2dzbTkvVHdrK0RZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMDE2OTkzNDBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUNCNkRENEI2OERDRTgyN0Q2MzYzMzg2MzQwMkM4RDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczNDkxMzI3Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSGVLaXFxT1ZRUUsyX0Fvb0FmZERpdyIsInBob25lSWQiOiI1MjM5OWEwNi0zMTA3LTRkZjUtYmRjNC1jNjhlYWE2YTRjNjciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKy9uMlRFQVZ2emJHdXgvOEdpcTgvK2MzbkF3PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFQaUhpQStUSGVrYzkzcjE4WDlDQ3VKd05JUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiI0UE1LWTIyRiIsIm1lIjp7ImlkIjoiMjM0ODEwMTY5OTM0MDo1MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSU90c0lzREVPblpvcnNHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoic25zMWUyKzhZaVBtNGpKeHNQencrRmU3V0RwNDlIc2grKy9PUi9nREIzOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUEpqZEMyaHlzdUdhalFnQTVNRkpZay9GOENHWk1aTHNBaHA2QlY4ZW5TY1NxMjdjVmtiZE5TN05hc0lVR2RMOGMvUUxpMUNuKzZrT285VjRjaGlKQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik9BNnF1R1BNNVJqM2s1NnltaDVPN2g4c29xbFZNUThRSVlzRDh1SG1DY0NtNVdES3N2TisvcTljUGNDamt4V2dEUVpyUEtnVCtZeW1lR005MWRaTGl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwMTY5OTM0MDo1MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiSjdOWHR2dkdJajV1SXljYkQ4OFBoWHUxZzZlUFI3SWZ2dnprZjRBd2QvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0OTEzMjcwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFXViJ9",
    PREFIXES: (process.env.PREFIX || '/').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
