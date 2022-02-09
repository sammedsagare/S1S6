const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "bans",
    description: "Shows the server's banned members.",
    category: "Moderation",
    guildOnly: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = ( await fetchBans )
        .map((member) => `${member.user.tag}`)
        .join('\n');
        
        const bansEmbed = new MessageEmbed()
        .setTitle("This server's banned members:")
        .setDescription(bannedMembers)
        .setColor("#FF0000")
        .setTimestamp();

        message.channel.send(bansEmbed)
    }
}