const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "seek",
    category: "MUSIC COMMANDS",
    useage: "seek <DURATION>",
    description: "Moves in the Song in: seconds",
    run: async (client, message, args) => {
    
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")
    
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
                
        //if no arguments, return error
        if (!args[0]) return message.channel.send("Please add the amount you wanna seek")
        
        //sned information message
        message.channel.send(`Seeked the song to \`${args[0]} seconds\``)
        
        //Seek
        client.distube.seek(message, Number(args[0] * 1000));
    }
};