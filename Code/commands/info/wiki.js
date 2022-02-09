const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: 'wiki',
    category: 'info',
    description: "wikipedia",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const body = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                args.join(" ")
            )}`
        ).then(res => res.json().catch(() => { }));
        if (!body) return message.channel.send("Page not found :x:");
        if (body.title && body.title === "Not found.")
            return message.channel.send("Error! Page Not Found... :x:");

        const embed = new Discord.MessageEmbed()
            .setTitle(`🌐 ${body.title}`)
            .addField(
                "More Info:",
                `**[Click Here](${body.content_urls.desktop.page})**`,
                true
            )
            .setDescription(`** ${body.extract} **`)
            .setColor("GREEN");
        if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.channel.send(embed);
    }
};