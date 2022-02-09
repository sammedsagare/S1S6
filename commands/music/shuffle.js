const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "shuffle",
    category: "MUSIC COMMANDS",
    aliases: ["mix"],
    useage: "shuffle",
    description: "Shuffles the queue",
    run: async (client, message, args) => {

        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //send information message
        message.channel.send("Shuffled ✅")

        //shuffle the queue
        client.distube.shuffle(message);
    }
};