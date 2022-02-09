const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "skipto",
    cooldown: 5,
    category: "MUSIC COMMANDS",
    aliases: ["jump"],
    useage: "skipto <Query number>",
    description: "Jump to a song in the Queue",
    run: async (client, message, args) => {
        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //if no args return error
        if (!args[0]) return message.channel.send("`" + message.author.tag + "`" + " Please add the position to which you want to skip to.")

        //get queue
        let queue = client.distube.getQueue(message);

        //if no queue return error
        if (!queue) return message.channel.send("Queue is empty!")

        if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
            message.channel.send(`Skipped ${parseInt(args[0])} songs!`)
            return client.distube.jump(message, parseInt(args[0]))
                .catch(err => message.channel.send("Invalid song number."));
        } else {
            return message.channel.send(`ERROR, Please use a number between **0** and **${DisTube.getQueue(message).length}**`)
        }
    }
};

