const Discord = require('discord.js');
const lyricsFinder = require('lyrics-finder');


module.exports = {
    name: 'lyrics',
    category: 'music',
    description: 'get lyrics for a song.',
    run: async (client, message, args) => {
        let pages = [];
        let currentPage = 0;

        const messageFilter = m => m.author.id === message.author.id;
        const reactionFilter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && (message.author.id === user.id)

        message.channel.send("Please enter the song name now");
        await message.channel.awaitMessages(messageFilter, { max: 1, time: 15000 }).then(async collected => {
            songName = collected.first().content;
            await finder(songName, message, pages)
        })

        const lyricEmbed = await message.channel.send(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage])
        await lyricEmbed.react('⬅️');
        await lyricEmbed.react('➡️');

        const collector = lyricEmbed.createReactionCollector(reactionFilter);

        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '➡️') {
                if (currentPage < pages.length - 1) {
                    currentPage += 1;
                    lyricEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage]);
                    message.reactions.resolve(reaction).users.remove(user)
                }
            } else if (reaction.emoji.name === '⬅️') {
                if (currentPage !== 0) {
                    currentPage -= 1;
                    lyricEmbed.edit(`Lyrics page: ${currentPage + 1}/${pages.length}`, pages[currentPage])
                    message.reactions.resolve(reaction).users.remove(user)
                }
            }
        })

        async function finder(songName, message, pages) {
            let fullLyrics = await lyricsFinder(songName) || "Not Found!";

            for (let i = 0; i < fullLyrics.length; i += 2048) {
                const lyric = fullLyrics.substring(i, Math.min(fullLyrics.length, i + 2048));
                const msg = new Discord.MessageEmbed()
                    .setDescription(lyric)
                pages.push(msg);
            }
        }
    }

}