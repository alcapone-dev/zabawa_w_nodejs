require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE,
    sessionKeySecret: process.env.SESSION_KEY_SECRET
}