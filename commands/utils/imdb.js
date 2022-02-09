const Discord = require('discord.js');
const movie = require('node-movie');

module.exports = {
    name: 'imdb',
    description: 'Get information about movies and shows from imdb',
    run: async (client, message, args, utils) => {

        const saymessage = args.join(' ');
        if (!saymessage) return message.reply('Please provide something to search!');
        movie(saymessage, data => {
            if (!data) return message.channel.send('No movie or show found with that name 😿');
            const embed = new Discord.MessageEmbed()
                .setDescription('**Date released:** ' + data.Released + '\n**Runtime**: ' + data.Runtime + '\n**Genre:** ' + data.Genre + '\n**Plot:** ' + data.Plot + '\n**Actors:** ' + data.Actors + '\n**Awards Received:**: ' + data.Awards)
                .setThumbnail(data.Poster)
                .setTitle(data.Title)
                .addFields({
                    name: 'Date Released',
                    value: `${data.Released}`,
                    inline: true,
                },
                    {
                        name: 'Runtime',
                        value: `${data.Runtime}`,
                        inline: true,
                    },
                    {
                        name: 'Genre',
                        value: `${data.Genre}`,
                        inline: true,
                    },
                    {
                        name: 'Plot',
                        value: `${data.Plot}`,
                        inline: false,
                    },
                    {
                        name: 'Actors',
                        value: `${data.Actors}`,
                        inline: true,
                    },
                    {
                        name: 'Awards Received',
                        value: `${data.Awards}`,
                        inline: true,
                    },
                );
            message.channel.send(embed);
        });
    }
}