// const Levels = require("discord-xp");
// /*eslint-disable*/
// const { MessageEmbed } = require("discord.js");
// const schema = require("../../models/level");

// module.exports = {
//   name: "leaderboard",
//   aliases: ["lb", "levels"],
//   description: "Checks leaderboard of the server",
//   timeout: "2000",
//   run: async (client, message, args) => {
    // const data = await schema.findOne({ Guild: message.guild.id });
    // if (!data) return message.channel.send({content: `Leveling System is not enabled`});
//     const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

//     if (rawLeaderboard.length < 1) return reply("Leaderboard is empty.");

//     const leaderboard = await Levels.computeLeaderboard(
//       client,
//       rawLeaderboard,
//       true
//     ); // We process the leaderboard.

//     const lb = leaderboard.map(
//       (e) =>
//         `\`${e.position}\`. **${e.username}#${e.discriminator}** - Level: **${
//           e.level
//         }** - XP: **${e.xp.toLocaleString()}**`
//     ); // We map the outputs.

//     message.channel.send({embeds: [
//       new MessageEmbed()
//         .setTitle(`**${message.guild.name}'s Leaderboard**`)
//         .setDescription(`${lb.join("\n\n")}`)
//         .setColor("RANDOM")
//     ]
//   }
//     );
//   },
// };
const Levels = require("discord-xp");
/*eslint-disable*/
const { MessageEmbed } = require("discord.js");
const schema = require("../../models/level");

module.exports = {
  name: "leaderboard",
  aliases: ["levels"],
  /**
   * @param {Client} client
   *      * @param {Message} message
   * @param {String[]} args
   *      */
  run: async (client, message, args) => {
    const data = await schema.findOne({ Guild: message.guild.id });
    if (!data) return message.channel.send({content: `Leveling System is not enabled`});


    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    // If no one's in leaderboard:
    if (rawLeaderboard.length < 1) {
      const noOne_ = new MessageEmbed()
        .setDescription("Leaderboard is empty.")
        .setColor("#FF0000");
      return message.channel.send(noOne_);
    }
    // roleColor
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.
    let lb = leaderboard.map(
      (e) =>
        `${e.position}. ${e.username}#${e.discriminator}\nLevel: **${
          e.level
        }**\nXP: **\`${e.xp.toLocaleString()}\`**\n`
    ); // We map the outputs.
    const bienO_ = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setTitle("Messages Leaderboard")
      .setDescription(lb, lb.join("\n\n"))
      .setColor(roleColor);
    message.channel.send(bienO_);
  },
};
