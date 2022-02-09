const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "removetrack",
    category: "MUSIC COMMANDS",
    aliases: ["rt"],
    useage: "removetrack <Queury Number>",
    description: "Removes a Specific Track",
    run: async (client, message, args) => {

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) 
        return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return message.channel.send("Queue is empty!")

        //if no args return
        if (!args[0]) return message.channel.send("You need to specify a song position!")
        
        //if args too big
        if (isNaN(args[0]) || Number(args[0]) >= queue.songs.length) return message.channel.send("Your Song Position is out of RANGE! Max: " + queue.songs.length);

        //save the current track on a variable
        var track = queue.songs[Number(args[0])]

        //clear the queue
        queue.songs.splice(Number(args[0]), Number(args[0]) + 1);
        
        //Send info message
        message.channel.send("Successfully removed your Track", `[${track.name}](${track.url})`)
    }
};

