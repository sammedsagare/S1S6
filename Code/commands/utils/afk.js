const db = require("../../reconDB")
const { MessageEmbed, Discord } = require('discord.js')
const client = require("../..")

module.exports = {
    name: "afk",
    description: "Set your afk status",
    run: async (client, message, args) => {
        const content = args.join(" ");
        await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
        const AFKembed = new MessageEmbed()
            .setDescription(`Your afk status has been set!\nReason: **${content}**`)
            .setColor("BLURPLE")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send(AFKembed)

    }
}