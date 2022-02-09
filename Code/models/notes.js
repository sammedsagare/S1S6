const { Schema, model } = require("mongoose");
module.exports = model(
    "note",
    new Schema({
        userID: String,
        notecount: String,
        guildID: String,
        note: String,
        author: String
    })
);