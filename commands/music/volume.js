const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "volume",
    category: "MUSIC COMMANDS",
    aliases: ["vol"],
    useage: "volume <VOLUME number>",
    description: "Changes volume",
    run: async (client, message, args) => {

        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)


        //if no arguments, return error
        if (!args[0]) return message.channel.send(" Please add a valid Volume Number", "The Number must be between `0` and `500`")

        //get the Number count if too big return error
        if (Number(args[0]) > 500 && Number(args[0]) < 0) return message.channel.send("Not valid Number\nPlease use a volume Number between `0` and `500`")

        //send information message
        message.channel.send(`Changed volume to: \`${args[0]} %\``)

        //set the volume
        await client.distube.setVolume(message, args[0]);
    }
};
