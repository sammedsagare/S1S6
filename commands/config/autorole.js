const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../reconDB');
module.exports = {
    name: 'autorole',
    category: 'config',
    description: "Gives a user a specific role when they join",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        const embed = new MessageEmbed()
        .setDescription(`<@&${role}> will be given when a member joins the server!`)

        if (!role) return message.channel.send('Role is not valid!')

        await db.set(`autorole-${message.guild.id}`, role.id);
        message.lineReply(embed)
    }
}