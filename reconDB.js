const client = require('./index');
const { reconDB } = require("reconlx");

const db = new reconDB(client, {
    uri: "your-database-url",
});

module.exports = db;