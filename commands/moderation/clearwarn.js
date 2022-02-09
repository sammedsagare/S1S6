const config = require('../../config.json');
const Discord = require('discord.js');
const warnings = require('../../models/warnSchema');

module.exports = {
    name: 'clearwarn',
    description: 'Clears all user warning!',
    run: async (client, message, args) => {
        const p = await client.prefix(message)

        const returnEmbed = new Discord.MessageEmbed()
            .setDescription('Sad but you cannot clear your own warns! You tried.')
            .setColor('RANDOM');

        const clearwarnEmbed = new Discord.MessageEmbed()
		.addField("Correct Usage: ", `\`\`\`fix\n${p}clearwarn [@Member]\`\`\``)
            
        const perms = message.member.permissions;
        const hasKick = perms.has('KICK_MEMBERS');
        if (!hasKick) return message.channel.send('You are missing permissions to use this command!');
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(clearwarnEmbed);

        if (member.id === message.author.id) return message.channel.send(returnEmbed);

        const GuildID = message.guild.id;
        const UserID = member.id;
        const userMention = member.user.tag;
        const errEmbed = new Discord.MessageEmbed()
            .setDescription(`There are no warns on the database for the user **${userMention}**`)
            .setColor('RED');

        const warnData = await warnings.findOne({
            UserID,
            GuildID,
        });

        if (!warnData) {
            return message.channel.send(errEmbed);
        }
        else {
            await warnings.deleteOne({
                UserID,
                GuildID,
            });
        }
        const successEmbed = new Discord.MessageEmbed()
            .setDescription(`Successfully cleared **${userMention}**'s warnings`)
            .setColor('GREEN');
        message.channel.send(successEmbed);
    }
}