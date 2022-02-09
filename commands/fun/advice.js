const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "advice",
    description: "Gives you advice",
    category: "fun",
    run: async (clientt, message) => {
        const data = await fetch("https://api.adviceslip.com/advice").then(res => res.json());

        const embed = new MessageEmbed()
            .setDescription(data.slip.advice)
            .setColor("GREEN")

        message.channel.send(embed);
    }
};