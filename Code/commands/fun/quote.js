const { Client, Message, MessageEmbed } = require('discord.js');
const Quote = require('randomquote-api')

module.exports = {
    name: 'quote',
    category: "fun",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(`#FFFFFF`)
            .setAuthor(Quote.randomQuote().author)
            .setDescription(Quote.randomQuote().quote)
            .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))
        message.channel.send(embed)
    }
}