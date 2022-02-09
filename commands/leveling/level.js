// const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
// const Levels = require('discord-xp')
// const canvacord = require('canvacord');
// const { color, gradient } = require('canvacord/src/Canvacord');
// const schema = require("../../models/level");

const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const Levels = require("discord-xp");
const schema = require("../../models/level");

module.exports = {
  name: "rank",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const data = await schema.findOne({ Guild: message.guild.id });
    if (!data)
      return message.channel.send({
        content: `Leveling System is not enabled`,
      });
    // Rank
    const target = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target.id, message.guild.id);
    const neededXp = Levels.xpFor(parseInt(user.level) + 1);

    // roleColor
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    // If the user mentioned/message.author has no XP:
    if (!user) {
      const nuser_ = new MessageEmbed()
        .setDescription(`Seems like the user has **no XP** so far.`)
        .setColor("#FF0000");
      return message.channel.send(nuser_);
    }

    // Rank Card
    // const rank = new canvacord.Rank()
    //   .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
    //   .setCurrentXP(user.xp)
    //   .setRank(parseInt(user.position))
    //   .setRequiredXP(neededXp)
    //   .setLevel(user.level)
    //   .setStatus(target.presence.status)
    //   .setProgressBar("#F69699")
    //   .setBackground("IMAGE", "https://media.discordapp.net/attachments/796052631943512104/829378130958614568/SmartSelect_20210407-210053_Pinterest.jpg?width=1025&height=410")
    //   .setUsername(target.username)
    //   .setDiscriminator(target.discriminator, "#696969")
    // rank.build()
    //   .then(data => {
    //     const attachment = new MessageAttachment(data, 'rankcard.png')
    //     message.channel.send(attachment)
    //   })
    const rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ dynamic: false, format: "png" }))
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRequiredXP(neededXp)
      .setStatus(target.presence.status)
      .setProgressBar("#f47fff")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator, "#696969")
      .setRank(user.rank + 1);
    rank.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "rank.png");
      message.channel.send({ files: [attachment] });
    });
  },
};

// /*eslint-disable*/
// const Discord = require("discord.js");
// const canvacord = require("canvacord");
// const Levels = require("discord-xp");
// const schema = require("../../models/level");
// module.exports = {
//   name: "rank",
//   aliases: ["xp"],
//   category: "server",
//   timeout: "1000",
//   description: "Shows level of a member",

//   run: async (client, message, args) => {
//     const data = await schema.findOne({ Guild: message.guild.id });
//     if (!data) return message.channel.send({content: `Leveling System is not enabled`});
//     try {
//       const user = await Levels.fetch(message.author.id, message.guild.id);

//       if (!user) message.reply({content: `Mhm, Looks like you dont have any xp yet!`});

//       const neededXp = Levels.xpFor(parseInt(user.level) + 1);

//       const rank = new canvacord.Rank()
//         .setAvatar(
//           message.author.displayAvatarURL({ dynamic: false, format: "png" })
//         )
//         .setCurrentXP(user.xp)
//         .setLevel(user.level)
//         .setRequiredXP(neededXp)
//         .setStatus(message.member.presence.status)
//         .setProgressBar("#f47fff")
//         .setUsername(message.author.username)
//         .setDiscriminator(message.author.discriminator)
//         .setRank(user.rank + 1);
//       rank.build().then((data) => {
//         const attachment = new Discord.MessageAttachment(data, "rank.png");
//         message.channel.send({files: [attachment]});
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   },
// };
