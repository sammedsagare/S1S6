const Discord = require('discord.js');
const { parse } = require('superagent');

module.exports = {
    name: 'addemoji',
    aliases: ['stealemoji', 'steal'],
    description: 'steal an emoji',
    run: async (client, message, args, utils, data) => {
        if (!message.guild.member(client.user).hasPermission('MANAGE_EMOJIS')) return message.reply('❌**Error:** I don\'t have the **Manage Emojis** permission!');
        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.reply('❌**Error:** You don\'t have the permission to do that! \n you require the **Manage Emojis** permission.');
        const image = message.attachments.first() || null;
        if (image) {
            if (!args[0]) return message.channel.send('Please give me an emoji name.');
            return message.guild.emojis.create(image.url, args[0]).then((emoji) => { message.channel.send(`Added ${emoji.url}`); }).catch(err => message.channel.send('There was an err with that. Heres the err: ```\n' + err + '```'));
        }
        if (!args.length) return message.reply('please give some emojis to add!');
        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? '.gif' : '.png';
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => { message.channel.send(`Added: ${emoji.url}`); })
                    .catch(err => message.channel.send('There was an err with that. Heres the err: ```\n' + err + '```'));
            }
        }
    }
}