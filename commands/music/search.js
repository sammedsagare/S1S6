const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "search",
    category: "MUSIC COMMANDS",
    cooldown: 5,
    useage: "search <URL/NAME>",
    description: "Searches for 10 results, in youtube",
    run: async (client, message, args) => {

        if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

        //if member not connected return error
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //if no arguments, return error
        if (!args[0]) return message.channel.send("Please add something you wanna search to")

        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return message.channel.send(" I am not allowed to \`join\` your channel")

        //If bot not connected, join the channel
        if (!message.guild.me.voice.channel)
            message.member.voice.channel.join().catch(e => {
                //send error if not possible
                return message.channel.send(" I am not allowed to \`join\` your Channel")
            })

        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return message.channel.send(" I am not allowed to \`speak\` in your channel")


        //send information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "Searching!", args.join(" "))

        //search tracks and send first 10 results etc
        let result = await client.distube.search(args.join(" "));

        //create variable
        let searchresult = "";

        //create string information
        for (let i = 0; i < 10; i++) {
            try {
                searchresult += await `**${i + 1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }

        //send search result embed
        await functions.embedbuilder(client, "null", message, config.colors.yes, "🔎 Search Results:", searchresult)

        //wait for userinput
        let userinput;
        await message.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000,
            errors: ["time"],
        }).then(collected => {
            //save userinput on var
            userinput = collected.first().content;
            //if input out of range, error
            if (Number(userinput) <= 0 && Number(userinput) > 10) {
                functions.embedbuilder(client, "null", message, config.colors.no, "Not a right option!", "Using default option, i.e, 1!")
                userinput = 1;
            }
        }).catch(() => {
            console.error;
            userinput = 404
        });

        //if smt went wrong return error
        if (userinput === 404) return functions.embedbuilder(client, "null", message, config.colors.no, "Something went wrong! / Time ran out")

        //send info message
        message.channel.send("🔎 Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)

        //play track
        client.distube.play(message, result[userinput - 1].url)
    }
};
