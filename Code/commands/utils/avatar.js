const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    category: "utils",
    aliases: ["av", "pfp"],
    description: "Shows a user's avatar",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        message.channel.send(
            new MessageEmbed()
            .setTitle(`**${member.user.tag}'s avatar / profile picture**:`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512}))
            .setColor("#7289DA")
            .setFooter("sup stalker!")
        )
    }
}