const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "loop",
    category: "Music",
    aliases: ["repeat"],
    cooldown: 4,
    useage: "loop <0/1/2>",
    description: "Changes loop from off/song/queue !",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
            if (!channel)
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    
                    .setTitle(`Please join a Channel first`)
                );
            if (!client.distube.getQueue(message))
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    
                    .setTitle(`I am not playing any song`)
                    .setDescription(`The Queue is empty`)
                );
            if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    
                    .setTitle(`Please join **my** VoiceChannel`)
                    .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
                );
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    
                    .setTitle(`You didn't provide a loop method`)
                    .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
                );
            let loopstate = args[0].toString();
            if (loopstate.toLowerCase() === "song") loopstate = "1";
            if (loopstate.toLowerCase() === "queue") loopstate = "2";
            if (loopstate.toLowerCase() === "off") loopstate = "0";
            if (loopstate.toLowerCase() === "track") loopstate = "1";
            if (loopstate.toLowerCase() === "q") loopstate = "2";
            if (loopstate.toLowerCase() === "qu") loopstate = "2";
            if (loopstate.toLowerCase() === "disable") loopstate = "0";

            loopstate = Number(loopstate);
            loopstates = {
                "0": "off",
                "1": "song",
                "2": "queue"
            }
            if (0 <= loopstate && loopstate <= 2) {
                client.distube.setRepeatMode(message, parseInt(loopstate));
                message.channel.send(new MessageEmbed()
                    .setColor("BLURPLE")
                    
                    .setTitle(`🔁 Changed Repeat mode to: \`${loopstates[loopstate]}\``)
                ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            }
            else {
                return message.channel.send(new MessageEmbed()
                    .setColor("RED")
                    
                    .setTitle(`You didn't provide a loop method`)
                    .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
                );
            }


        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                
                .setTitle(`An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}


// const functions = require("../../functions")
// const config = require("../../config.json");
// const { MessageEmbed } = require("discord.js");
// module.exports = {
//     name: "loop",
//     cooldown: 5,
//     category: "MUSIC COMMANDS",
//     aliases: ["repeat"],
//     useage: "loop <0/1/2> |",
//     description: "Enables loop for off / song / queue*\n0 = off\n1 = song\n2 = queue",
//     run: async (client, message, args) => {
//         //If Bot not connected, return error
//         if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

//         //if member not connected return error
//         if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

//         //if they are not in the same channel, return error
//         if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

//         //if no arguments return error
//         if (!args[0]) return message.channel.send("`" + message.author.tag + "`" + " Please add the loop style", `Valid Options:\n\n\`0\`   /   \`1\`   /   \`2\`\n\`off\` / \`song\` / \`queue\``)

//         //set variable
//         let loopis = args[0];
//         if (args[0].toString().toLowerCase() === "song") loopis = "1";
//         else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
//         else if (args[0].toString().toLowerCase() === "off") loopis = "0";
//         else if (args[0].toString().toLowerCase() === "s") loopis = "1";
//         else if (args[0].toString().toLowerCase() === "q") loopis = "2";
//         else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
//         loopis = Number(loopis);

//         //change loop state
//         if (0 <= loopis && loopis <= 2) {
//             await client.distube.setRepeatMode(message, parseInt(args[0]));
//             const loopEmbed = new MessageEmbed()
//             .setDescription("Repeat mode set to:", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
//             .setColor("BLUE")
//             await message.channel.send(loopEmbed)
//             return;
//         } else {
//             return message.channel.send(`ERROR, Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
//         }
//     }
// };