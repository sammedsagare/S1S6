const Discord = require('discord.js');
const client = require('../index')
const db = require('../reconDB')


client.on('message', async message => {
    if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`);
        await db.delete(`afk-${message.author.id}+${message.guild.id}`);
        message.lineReply(`Welcome back, you afk status has been removed!`);
    }
    if (message.mentions.members.first()) {
        if (
            await db.has(
                `afk-${message.mentions.members.first().id}+${message.guild.id}`
            )
        ) {
            const isAFkEmbed = new Discord.MessageEmbed()
                .setDescription(`**${message.mentions.members.first().user.tag}**` +
                    " is AFK: " +
                    (await db.get(
                        `afk-${message.mentions.members.first().id}+${message.guild.id}`
                    )))
                .setColor("BLURPLE")
            message.channel.send(isAFkEmbed)
            // message.channel.send(
            //   message.mentions.members.first().user.tag +
            //   " is AFK, Reason: " +
            //   (await db.get(
            //     `afk-${message.mentions.members.first().id}+${message.guild.id}`
            //   ))
            // );
        } else return;
    } else;
})