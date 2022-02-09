const Schema = require('../../models/welcomeChannel')
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
  name: "setWelcome-channel",
  aliases: ["swc"],
  category: 'config',
  description: 'Used to setup a welcome channel.',

  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_SERVER')) return;

    const channel = message.mentions.channels.first();
    if (!channel) return message.reply('No channel provided!')

    Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) {
        data.Channel = channel.id,
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }
      message.channel.send(`${channel} has been set as this server's Welcome Channel!`)
    });
  },
};