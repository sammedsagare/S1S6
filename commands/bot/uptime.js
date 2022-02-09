const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'uptime',
    description: 'Returns the uptime of the bot.',
    aliases: ["upt"],
    run: async (client, message, args) => {


        {
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;
    
            const embed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setTitle(`Uptime #${message.guild.shard.id}`)

                .setDescription(`\`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds\``)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true}))
  
            message.lineReplyNoMention(embed);
 
        }
    }
}