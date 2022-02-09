const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "clearqueue",
    category: "MUSIC COMMANDS",
    aliases: ["clearqu"],
    useage: "clearqueue",
    description: "Clears the Queue",
    run: async (client, message, args) => {

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return message.channel.send("The queue is empty!")

        //clear the queue
        queue.songs = [queue.songs[0]];
        
        //Send info message
        message.channel.send("The queue has been cleared!")
    }
};