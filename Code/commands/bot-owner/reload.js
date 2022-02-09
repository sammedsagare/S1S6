const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const glob = require("glob");
module.exports = {
  name: 'reload',
  category: "bot-owner",
  description: "Reloads all the commands, OWNER ONLY command!",
  hidden: true,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (message.author.id !== '508865773360381952') return;

    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);

        if (pull.name) {
          console.log(`Reloaded ${pull.name} (cmd)`);
          client.commands.set(pull.name, pull)
        }

        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.name)
          });
        }
      });
      message.channel.send("Reloaded all commands")
      message.react('✅')
    })

  }
}