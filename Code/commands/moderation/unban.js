const { message, MessageEmbed } = require("discord.js")

module.exports = {
  name: 'unban',
  description: 'unbans a user',
  usage: '<userid>',

  run: async (client, message, args) => {


    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permission to use this command!')


    if (!args[0]) return message.channel.send('You did not specify a user to unban')

    try {
      const user = await message.guild.members.unban(args[0])

      const returnEmbed = new MessageEmbed()
      .setDescription(`${user} has been unbanned!`)

      return message.channel.send(returnEmbed)
    } catch {
      return message.channel.send('The user id you provided is either invalid, or the user is not banned.')
    }
  }
}