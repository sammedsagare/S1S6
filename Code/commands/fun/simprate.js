const Discord = require('discord.js');;

module.exports = {
    name: 'simprate',
    category: "fun",
    description: 'See how much simp you and your friends are 😶',
    run: async (client, message, args, utils) => {
        let user;
        if (!message.mentions.users.first()) { user = message.author; }
        else { user = message.mentions.users.first(); }
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`${user.username}'s simprate`)
            .setDescription(`${user.username} is ${rate}% simp`);
        message.channel.send(embed);
    }
}