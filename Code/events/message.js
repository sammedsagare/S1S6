const Discord = require('discord.js');
const client = require('../index')
const db = require('../reconDB')
const levelSchema = require("../models/level");
const Levels = require("discord-xp");
Levels.setURL('mongodb+srv://sam_nexon:a14bionicchip@nexon.k6rfz.mongodb.net/test');

client.on('message', async message => {
  const p = await client.prefix(message)
  if (message.author.bot) return;


  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const m = new Discord.MessageEmbed()
      .setTitle('Hi, I\'m Nexon!')
      .setDescription('One of the most compact and easy to use bot on Discord!')
      .addField('Prefix and Usage', 'My prefix in this server is ' + `\`${p}\`` + `\n *Tip: Run \`${p}help\` to get started! | use \`${p}set-prefix <prefix>\` to change prefix!*`)
      .addField('Invites :', '[Support server](https://discord.gg/G9Q458kXg5) | [Bot invite](https://www.youtube.com/watch?v=dQw4w9WgXcQ)')
      .setColor('RANDOM');
    message.channel.send(m);
  }
  await levelSchema.findOne(
    { Guild: message.guild.id },
    async (err, data) => {
      if (!data) return;
      const randomXp = Math.floor(Math.random() * 9) + 1;
      const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomXp
      );
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congrats ${message.author.username}, you just leveled up to level ${user.level}!`)
      }
    }
  );




  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);



  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args)
})

