const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const { confirmation } = require('@reconlx/discord.js')

module.exports = {
    name: 'reset-prefix',
    category: 'config',
    run: async (client, message) => {
        if (!message.member.hasPermission("MANAGE_SERVER")) return;
        message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if (emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                message.channel.send(`The prefix has been reset to ${prefix}`)
            }
            if (emoji === '❌') {
                msg.delete()
                message.channel.send('reset prefix has been cancelled.')
            }
        })

    }
}