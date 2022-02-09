const ms = require('ms')
const Discord = require('discord.js')

module.exports = {
    name: 'remind',
    aliases: ['reminder', 'rem', 'tmr', 'timer'],
    category: 'utils',
    description: 'remind yourself about something 👀',
    run: async (client, message, args, utils, data) => {
        const p = await client.prefix(message)

        // Variables
        let reason = args.slice(1).join(" ")
        let time = args[0];

        // Input Checking
        const tempMuteFormatErr = new Discord.MessageEmbed()
            .setDescription('When should I remind you? Specify the time limit smh')
            .setColor('RED')
        if (!time) return message.channel.send(tempMuteFormatErr)

        const noReasonInput = new Discord.MessageEmbed()
            .setDescription('What should I remind you? to eat food? to drink milk? None? specify it smh')
            .setColor('#ff0000')
        if (!reason) return message.channel.send(noReasonInput)

        // Executing
        const muteEmbedServer = new Discord.MessageEmbed()
            .setAuthor('| Reminder Set!', message.author.displayAvatarURL())
            .setDescription(`Successfully set ${message.author.tag}'s reminder!`)
            .addField(" I'll remind you in:", `${time}`)
            .addField('What will I remind you? This: ', `${reason}`)
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('Successfully Reminded The Command Author!')

        message.channel.send(muteEmbedServer)
        console.log(`${message.author.tag}'s Reminder has started! Reminding him/her in ${time}`)

        setTimeout(async function () {
            console.log(`${message.author.tag}'s Reminder has finished! I've successfullying reminded him!`)

            message.channel.send(`<@${message.author.id}> Here is your reminder!`)
            const reminderEmbed = new Discord.MessageEmbed()
                // .setAuthor('I did remind you, see, I am smart 😏', message.author.displayAvatarURL())
                .setDescription(`${message.author.tag} your reminder 👀`)
                .setColor('BLUE')
                .addField('you asked me to remind you about this: ', `${reason}`)
                .setTimestamp()

            message.channel.send(reminderEmbed)


        }, ms(time));
    }
}
