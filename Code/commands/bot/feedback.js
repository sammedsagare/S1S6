const Discord = require("discord.js");
module.exports = {
    name: 'feedback',
    aliases: ['feed-back'],
    category: 'bot',
    useage: '{prefix}feedback [your report here]',
    run: async (client, message, args) => {
        let feedback = args.join(" ").slice(0);
        let user = message.author.username;
        let uid = message.author.id;
        let guild = message.guild.name;
        let gid = message.guild.id;
        let channel = client.channels.cache.get("837999503650193468")
        let embed = new Discord.MessageEmbed()
            .setTitle(`Feedback Report`)
            .addField("Feedback", feedback)
            .addField("Feedback By", user)
            .addField("Feedback User ID", uid)
            .addField("Feedback Guild Name ", guild)
            .addField("Feedback Guild ID", gid)
            .setColor("YELLOW")
            .setTimestamp()
            .setFooter("New Feedback Found")

        message.lineReply("**Your Feedback has been reported in the official server. Thank you for supporting us!**")
        channel.send(embed)


    }
};