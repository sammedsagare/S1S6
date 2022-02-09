const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "bird",
  description: "Shows a picture of a bird",
  category: "animal",
  run: async (client, message) => {
    const data = await (
      await fetch("https://some-random-api.ml/img/birb")
    ).json();

    const embed = new MessageEmbed()
      .setDescription(`[Click here if image failed to load](${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  },
};
