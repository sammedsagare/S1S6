const client = require('../index');
const { MessageEmbed } = require('discord.js')
const logsChannel = '851691621338447942';

client.on('guildCreate', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
            .setTitle('New Server!')
            .addField('Guild Info', `Name: ${guild.name} Id: (${guild.id}) **${guild.memberCount} members!**`)
            .addField('Owner Info', `${guild.owner} (${guild.owner.id})`)
            .setFooter(`Currently in ${client.guilds.cache.size} guilds!`)
            .setTimestamp()
            .setColor('BLURPLE')
    )
})