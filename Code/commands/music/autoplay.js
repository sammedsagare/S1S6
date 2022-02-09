const functions = require("../../functions")
const config = require("../../config.json");
const { Discord, Client, MessageEmbed } = require('discord.js')
module.exports = {
  name: "autoplay",
  category: "MUSIC COMMANDS",
  aliases: ["ap", "randomsong"],
  useage: "autoplay",
  description: "Enables autoplay - random similar songs",
  run: async (client, message, args) => {

    if (!message.guild.me.voice.channel) return message.channel.send('Not playing any song(s)')

    //if member not connected return error
    if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel to execute this command!")

    //if they are not in the same channel, return error
    if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return message.channel.send(" You must join my voice channel: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

    //get queue
    let queue = client.distube.getQueue(message);

    //if no queue return error
    if (!queue) return message.channel.send("Queue is empty!")

    //send info message + toggle autoplay
    const autoplayEmbed = new MessageEmbed()
      .setDescription(`Autoplay is now **${client.distube.toggleAutoplay(message) ? "enabled" : "disabled"}**!`)
      .setColor("#ff0000")
    
    message.channel.send(autoplayEmbed);

  }
};