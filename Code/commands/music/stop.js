const functions = require("../../functions");
const config = require("../../config.json")
module.exports = {
    name: "stop",
    category: "MUSIC COMMANDS",
    aliases: ["leave"],
    useage: "stop",
    description: "Stops playing and leaves the channel",
    run: async (client, message, args) => {


        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //send information message
        message.channel.send("Stopped music and left the channel!")

        //leave channel if bot joined via opus stream
        message.member.voice.channel.leave().catch(e => console.log("could not leave the channel LOLOL"))

        //stop distube
        client.distube.stop(message);

    }
};
