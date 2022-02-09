const { Schema, model } = require("mongoose");
module.exports = model(
    "notecount",
    new Schema({
        guildID: String,
        notecount: Number
    })
);