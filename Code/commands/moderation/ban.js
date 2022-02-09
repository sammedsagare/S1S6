const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Bans member from the server or out of the server',
  aliases: ['b'],
  run: async (client, message, args) => {
    const p = await client.prefix(message)
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permissions to use this command!')

    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I do not have permissions to execute this command!')

    const user = message.member

    let member = message.mentions.members.first()
    let reason = args[1]

    const wrongUsageEmbed = new MessageEmbed()
    .addField("Correct Usage: ", `\`\`\`fix\n${p}ban [@Member] [Reason]\`\`\``)
    .setColor("#ff0000")

    if (!member) {
      member = await message.guild.members.cache.get(args[0])
    }
    
    if (!member) {
      try {
        member = await client.users.fetch(args[0])
      } catch (e) {
        console.log('An error occured.')
        return message.channel.send(wrongUsageEmbed)
      }
    }

    if (!args[1]) {
      reason = "No reason provided";
    } else if (args[1]) {
      reason = args.slice(1).join(" ");
    }

    if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";

    const bannedEmbed = new MessageEmbed()
      .setTitle('Banned Member!')
      .setDescription(`${member} was successfully banned.`)
      .addField('Member', `${member.tag}, ${member.id}`, true)
      .addField('Reason', reason)
      .setTimestamp()

    const dmEmbed = new MessageEmbed()
      .setTitle("Banned!")
      .setDescription(`You have been ban from **${message.guild}**!`)
      .addField('Member', member, true)
      .addField('Reason', reason)
      .setTimestamp()

    try {
      await message.guild.members.ban(member.id, {
        reason: reason
      })

      message.channel.send(bannedEmbed)

      try {
        await member.send(dmEmbed)

        user.send('I have successfully sent the reason to the user!')
      } catch (e) {
        user.send('I could not DM the user! Reason logged.')
        console.log('An error occured while sending the DM embed!' + e)
      }
    } catch (e) {
      message.channel.send('An error occured while executing the action!')
      console.log("An error occured while executing the ban command!" + e)
    }
  }
}



// const { Client, Message, MessageEmbed } = require('discord.js');

// module.exports = {
//   name: "ban",
//   aliases: ["b"],
//   description: "Bans a user",
//   userPermissions: ["BAN_MEMBERS"],
//   botPermissions: ["BAN_MEMBERS"],
//   details: "Bans a user using either a mentioning or an ID",
//   category: "Moderation",
//   usage: "{prefix}ban <@user | userID> [reason]",
//   guildOnly: true,
//   /** 
//    * @param {Client} client 
//    * @param {Message} message 
//    * @param {String[]} args 
//    */
//   run: async (client, message, args) => {

//     let member = message.mentions.members.first() || await message.guild.members.fetch(args[0])
//     if (!member) return message.reply('Please specify a member!')
//     if (!member.bannable) return message.reply(`**${member.user.tag}** cannot be banned, due to permission issues!`)
//     if (member.user.id === client.user.id) return message.reply('You cannot ban me with my own command!')

//     let reason = args.slice(1).join(" ")
//     if (!reason) reason = "Reason not specified";

//     const banEmbed = new MessageEmbed()
//       .setAuthor(client.user.tag, client.user.displayAvatarURL())
//       .setColor("33FFB7")
//       .setTitle("Ban")
//       .setThumbnail(member.user.displayAvatarURL())
//       .addField("Member:", `**${member.user.tag}** (${member.user.id})`)
//       .addField("Reason:", reason)
//       .setTimestamp()
//     message.guild.members.ban(member.id).catch(() => { })
//     message.channel.send(banEmbed);
//   }
// }
