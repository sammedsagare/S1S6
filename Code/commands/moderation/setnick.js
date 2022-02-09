const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "setnick",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_NICKNAMES")) return;
        const member = message.mentions.members.first();

        if (!member) return message.reply("Please specify a member!");

        const arguments = args.slice(1).join(" ");

        if (!arguments) return message.reply("Please specify a nickname!");

        try {
            member.setNickname(arguments);
        } catch (err) {
            console.log(err);
            message.send(
                "I do not have permission to set " + member.toString() + " nickname!"
            );
        }
    },
};