const client = require('../index')
const { MessageEmbed } = require('discord.js');
client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
        ) channelToSend = channel;
    });

    if (!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription("<:hello:847677856665698355> Thank you for inviting me! Run `s.help` to get started!\nIf you need anymore help regarding the bot join the support server! https://discord.gg/n89wQ8gSkv")
            .setTimestamp()
            .setColor("#303136")
    )
});