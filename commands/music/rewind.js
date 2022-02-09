const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "rewind",
    category: "MUSIC COMMANDS",
    aliases: ["rew"],
    useage: "rewind <DURATION>",
    description: "Rewinds the Song back: seconds",
    run: async (client, message, args) => {

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get the Queue
        let queue = client.distube.getQueue(message);

        //if no Queue return error message
        if (!queue) return message.channel.send("Queue is empty!")


        //if no arguments, return error message
        if (!args[0]) return message.channel.send("Please add the amount you wanna rewind")

        //get seektime
        let seektime = queue.currentTime - Number(args[0]) * 1000;
        if (seektime < 0) seektime = 0;
        if (seektime >= queue.songs[0].duration - queue.currentTime) seektime = 0;


        //seek
        client.distube.seek(message, Number(seektime));

        //send information message
        message.channel.send("Rewind completed! \`${args[0]} seconds\``")
    }
};

