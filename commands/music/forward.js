const functions = require("../../functions")
const { Discord, Client, MessageEmbed } = require('discord.js')
const config = require("../../config.json")
module.exports = {
    name: "forward",
    category: "MUSIC COMMANDS",
    aliases: ["fwd", "for"],
    useage: "forward <DURATION>",
    description: "Forwards the Song forward: seconds",
    run: async (client, message, args) => {

        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);

        //if no queue return error
        if (!queue) return message.channel.send("Not playing anything / Queue is empty!")

        //get the seektime
        let seektime = queue.currentTime + Number(args[0]) * 1000;
        if (seektime >= queue.songs[0].duration * 1000) seektime = queue.songs[0].duration * 1000 - 1;

        //seek 
        client.distube.seek(message, Number(seektime));

        //Send info message
        // functions.embedbuilder(client, 3000, message, config.colors.yes, "FORWARD!", `Forwarded the song for \`${Number(args[0])} seconds\``)
        const seekEmbed = new MessageEmbed() 
        .setDescription( `Forwarded the song for \`${Number(args[0])} seconds\``)
        .setColor("BLURPLE")
    }
};