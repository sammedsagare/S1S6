const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "youtube-together",
    aliases: ["ytt", "yt"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const voicechannel = message.member.voice.channelID;
        if (!voicechannel)
            return message.reply(`You need to be in a voice channel to run this command`);
        client.discordTogether
            .createTogetherCode(voicechannel, "youtube")
            .then(async (invite) => {
                const embed = new MessageEmbed()
                .setDescription(`[Click here to start YouTube Together](${invite.code})`)
                .setColor("#ff0000")
                return message.lineReply(embed);
            });
    },
};