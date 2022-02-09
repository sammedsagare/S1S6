//change my mind command

const Discord = require("discord.js")
const canvacord = require("canvacord")
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'cmm',
  category: 'fun',
  description: "change my mind",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {

    if (!args[0]) return message.channel.send('Provide a valid text');
    let m = await message.channel.send('**Please wait....**');
    let image = await canvacord.Canvas.changemymind(args.join(' '));
    let changemymind = new Discord.MessageAttachment(image, 'cmm.png');
    m.delete({ timeout: 5000 });
    return message.channel.send(changemymind);
  }
}