const Schema = require('../../models/welcomeChannel')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "welcome-channel",
  aliases: ["cwc"],
  category: 'config',
  description: 'Used to check this server\'s welcome channel.',

  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_SERVER')) return;

    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) return message.channel.send('Could not find any data for this server')

      const channel = client.channels.cache.get(data.Channel);

      message.channel.send(`This server\'s welcome channel is: ${channel}`)
    });
  },
};