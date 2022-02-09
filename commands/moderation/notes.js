const note = require('../../models/notes');
const Discord = require('discord.js');
module.exports = {
    name: 'notes',
    description: 'a command to show a saved note',
    aliases: ['shownote'],
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have MANAGE_MESSAGES to use this command!')

        if (!args[0])
            return message.reply(
                `You should send an \`ID\` of a user or mention them!!`
            );
        const user =
            message.guild.members.cache.get(args[0]) ||
            message.mentions.members.first();
        const guild = message.guild;
        const token = note.findOne({ userID: user.id, guildID: guild.id });

        if (!token) {
            message.reply(`No match found. Please try again.`);
        } else if (token) {
            note.find({ userID: user.id, guildID: guild.id }, async (err, data) => {
                if (err) throw err;
                const me = new Discord.MessageEmbed()
                    .setTitle(`Saved Notes For ${message.author.username}`)
                    .setColor(`#FF3EFF`)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(
                        data
                            .map(
                                x =>
                                    ` \nID: **#${x.notecount}** \n${x.note
                                    }\n \n**Note By**: <@!${x.author}>`
                            )
                            .join('\n') || `no notes!`
                    );
                message.channel.send(me);
            });
        }
    }
};