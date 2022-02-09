const client = require('../index');
const { MessageEmbed } = require("discord.js");
const Schema = require('../models/welcomeChannel');

client.on("guildMemberAdd", async (member) => {
  Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
    if (!data) return;
    const user = member.user;
    const channel = member.guild.channels.cache.get(data.Channel);
    const welcomeEmbed = new MessageEmbed()
    .setDescription(`Welcome ${user} to ${member.guild.name}\nThere are now ${member.guild.memberCount} members`)
    .setColor("#7289DA")
    .setTimestamp()
    channel.send(welcomeEmbed);
  })

})
