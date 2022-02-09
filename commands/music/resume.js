const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "resume",
    category: "MUSIC COMMANDS",
    aliases: ["r"],
    useage: "resume",
    description: "Resume the song",
    run: async (client, message, args) => {
        
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")
    
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
    
        
        //if Bot is not paused, return error
        if (!client.distube.isPaused(message)) return functions.embedbuilder(client, "null", message, config.colors.no, "Not paused!")
        
        //send information embed
        message.channel.send("Resumed!")

        //resume
        client.distube.resume(message);
    }
};
