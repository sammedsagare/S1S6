const notecounts = require('../../models/notecount');
const note = require('../../models/notes');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'setnote',
    description: 'a set note command',
    aliases: [''],
    run: async (client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have ADMINISTRATOR permissions to use this command!')
        const p = await client.prefix(message);
        const usage = new MessageEmbed()
            .setDescription("The correct usage is as follows:")
            .addField("Correct Usage:", `\`\`\`fix\n${p}setnote [@Member] [Note]\`\`\``)
            .addField("Example:", `${p}setnote <@!${client.user.id}> This is a note!`)
            .setColor("#ff0000")

        if (!args[0])
            return message.reply(usage);

        if (!args[1])
            return message.reply(usage);

        const user = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        const count = await notecounts.findOne({ guildID: message.guild.id });
        const notes = args.slice(1).join(' ');

        if (!count) {
            new notecounts({
                guildID: message.guild.id,
                notecount: 10001
            }).save();
            message.channel.send(`Please run the command again!!!`);
        } else {
            const counted = count.get('notecount');
            console.log(counted);

            new note({
                userID: user.id,
                guildID: message.guild.id,
                note: notes,
                author: message.author.id,
                notecount: parseInt(counted) + 1
            }).save();
            message.channel.send(`I have saved the notes for the user!`);

            await count.updateOne(
                {
                    notecount: parseInt(counted) + 1
                },
                { new: true }
            );
        }
    }
};