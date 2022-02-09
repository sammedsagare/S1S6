const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'pp-execute',
    description: "execute someone's pp",
    category: "fun",
    run: async (client, message, args) => {

        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.channel.send("Mention a user!");
        }

        const embed = new MessageEmbed()
        .setThumbnail("https://tenor.com/view/banana-cut-gif-4539289")
        .setColor("RANDOM")

        message.channel.send(`${taggedUser}, your pp has been executed!\nhttps://tenor.com/view/banana-cut-gif-4539289`)

    }
}