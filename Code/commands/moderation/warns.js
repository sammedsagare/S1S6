const config = require('../../config.json');
const Discord = require('discord.js');
const warnings = require('../../models/warnSchema');

module.exports = {
    name: 'warns',
    aliases: ['warnings'],
    description: 'Lists all warnings of a member!',
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send('Can\'t seem to find this user!');

        const returnEmbed = new Discord.MessageEmbed()
            .setDescription(`There are no warns on the database with the name **${member.user.tag}**`)
            .setColor('RANDOM');
        const GuildID = message.guild.id;
        const UserID = member.id;
        const userMention = member.user.tag;
        const results = await warnings.findOne({
            GuildID,
            UserID,
        });
        if (results == null) { return message.channel.send(returnEmbed); }

        let reply = '\n';

        for (const warning of results.Punishments) {
            const { Moderator, Timestamp, Reason } = warning;

            reply += `\`Responsible Moderator :\` **${Moderator}**\n\`Reason :\` **${Reason}**\n\`Date :\` **${new Date(Timestamp).toLocaleDateString()}**\n\n`;
        }
        const replyEmbed = new Discord.MessageEmbed()
            .setAuthor(`Warn History For ${userMention}`)
            .setDescription(reply)
            .setColor('RANDOM')
            .setFooter("Note that the date is the the format of `mm/dd/yy`");

        message.channel.send(replyEmbed);
    }
}