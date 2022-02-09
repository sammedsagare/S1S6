const { MessageEmbed, Client, Message } = require('discord.js') // requring the discord.js package
const db = require('../../models/logs'); // the model file, for storing the channel for logs!

/***
 * @param {Message} message
 * @param {Client} client
 * @param {String[]} args
 */

// params ^ (are not necessary but i use them!)

module.exports = {
    name: 'logs', // name of the command
    description: 'Set your logs channel!', //description
    usage: '<disable/set>', //usage!
    category: 'config',

    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply('You dont have perms lmfao!!')
        // runing the command!

        const options = [
            "set",
            "disable"
        ]

        if (!args.length) return;
        const opt = args[0].toLowerCase();
        if (!opt) return message.reply('Please provide a valid option! ( set / disable )')


        if (!options.includes(opt)) return message.reply('That is not a valid option!')

        if (opt === 'set') {

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
            if (!channel) return message.reply('Please provide the channel!')

            db.findOne({
                guild: message.guild.id
            }, async (err, data) => {
                if (!data) {
                    data = new db({
                        guild: message.guild.id,
                        channel: channel.id
                    }).save()
                    return message.reply(`The logs channel has been set as <#${channel.id}>!`)
                } else {
                    return message.reply(`The logs channel has already been set as <#${data.channel}>!`)
                }
            })
        } else {
            db.findOne({
                guild: message.guild.id
            }, async (err, data) => {
                if (!data) {
                    return message.reply(`The logs channel has not been set!`)
                } else {
                    await db.findOneAndDelete({ guild: message.guild.id }, data)
                    data.save()
                    return message.reply(`The logs channel has been reset and the logs command has been disabled!!`)
                }

            })
        }
    }
}