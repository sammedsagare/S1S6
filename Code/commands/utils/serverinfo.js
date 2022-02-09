const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "serverinfo",
    description: "Shows info about a server",
    aliases: ['serverinfo', 'server-info', 'si', 's-i'],
    usage: "serverinfo",
    run: async (client, message, args) => {

        //command
        let servericon = message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setTitle("Server Information")
            .setColor(config.colors.yes)

            .addField("Server Name", "\`" + message.guild.name + "\`")
            .addField("Owner", "\`" + `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}\``, true)
            .addField("Channels", "\`" + message.guild.channels.cache.size + "\`", true)
            .addField("Roles", "\`" + message.guild.roles.cache.size + "\`", true)
            .addField("Created On", "\`" + message.guild.createdAt + "\`")
            .addField("Total Members", "\`" + message.guild.memberCount + "\`")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
        message.channel.send(serverembed);
    }
};

// const { MessageEmbed } = require("discord.js")

// module.exports = { 
//     name: "serverinfo",
//     aliases: ['serverinfo', 'server-info', 'si', 's-i'],
//     description: 'Gives Info About A Server',

//     run: async (client, message, args) => {

//         const { guild } = message
//         const icon = message.guild.iconURL({ dynamic: true }) // Icon Of Server
//         const roles = message.guild.roles.cache.map(e => e.toString()) // Roles Of Server
//         const emojis = message.guild.emojis.cache.map(e =>  e.toString()) // Emojis Of Server
//         const emojicount = message.guild.emojis.cache // EmojiCount If Server
//         const members = message.guild.members.cache // Members In Server
//         const create = message.guild.createdAt.toLocaleDateString() // Server Created Date

//         const embed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setAuthor(`${message.guild.name} Info`, icon)
//         .setThumbnail(`${icon}`)
//         .addField('Server Onwer:-', `${guild.owner}`, true)
//         .addField('Server ID:-', `${guild.id}`, true)
//         .addField('Server Creation Date:-', `${create}`, true)
//         .addField('Boost Count:-', `<a:Boost:829250347893129237> ${guild.premiumSubscriptionCount}`, true)
//         .addField('Boost Level:-', `<a:Boost:829250347893129237> ${guild.premiumTier}`, true)
//         .addField('Highest Role:-', `${guild.roles.highest}`, true)
//         .addField('Member Count:-', `${members.size}(Total)\n${members.filter(member => !member.user.bot).size}(Human)\n${members.filter(member => member.user.bot).size}(BOT)`, true)
//         .addField('Member Stats:-', `${guild.members.cache.filter(member => member.presence.status == 'online').size} <:Online:829250388283752468>\n${guild.members.cache.filter(member => member.presence.status == 'idle').size} <:Idle:829250408962719744>\n${guild.members.cache.filter(member => member.presence.status == 'dnd').size} <:dnd:829559775816581130>\n${guild.members.cache.filter(member => member.presence.status == 'offline').size} <:Offline:829250446799536141>`, true)
//         .addField('Emoji Count:-', `${emojicount.size}(Total)\n${emojicount.filter(emoji => !emoji.animated).size}(Non Animated)\n${emojicount.filter(emoji => emoji.animated).size}(Animated)`, true)
//         .addField('Server Stats:-', `${guild.channels.cache.filter(channel => channel.type == 'text').size} ⌨️(Text Channel)\n${guild.channels.cache.filter(channel => channel.type == 'voice').size} 🔈(Voice Channel)\n${guild.channels.cache.filter(channel => channel.type == 'news').size} 📢(Announcement Channel)\n${guild.channels.cache.filter(channel => channel.type == 'category').size} 📁(Categories)`, true)
//         .setTimestamp()
//         .setFooter('Server Info', icon)
//         message.channel.send(embed)
//     }
// }
