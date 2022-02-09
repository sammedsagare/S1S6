const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'links',
    category: 'bot',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const sayEmbed = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dyanmic: true })
            )
            .addFields(
                {
                    name: 'Add S1S6',
                    value: `[Click here](https://invite.s1s6.eu.org)`,
                    inline: false
                },
                {
                    name: "S1S6's top.gg Page",
                    value: `[Click here](https://top.gg/bot/801056077847592960)`,
                    inline: false
                },
                {
                    name: 'Vote',
                    value: `[Click here](https://top.gg/bot/801056077847592960/vote)`,
                    inline: false
                },
                {
                    name: 'S1S6 Support',
                    value: `[Click here](https://discord.gg/n89wQ8gSkv)`,
                    inline: false
                }
            )
            .setTimestamp()
            .setColor("#303136");

        message.channel.send(sayEmbed);
    }
};


// const { MessageButton } = require("discord-buttons");
// const Discord = require("discord.js");
// module.exports = {
//     name: 'links',
//     aliases: ["vote", "invite", "support", "supportserver", "inv"],
//     run: async (client, message, args) => {

//         message.channel.send("You will find all the links related to the bot here:\nhttps://linktr.ee/s1s6")
//     }
// }
