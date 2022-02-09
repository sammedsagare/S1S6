
const client = require('../index.js');
const db = require('../models/logs');
const { MessageEmbed } = require('discord.js');

client.on('guildMemberAdd', async (member) => { 
    db.findOne({ guild: member.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const gMa1 = member.guild.channels.cache.get(ch);

        const gma1 = new MessageEmbed()
            .setTitle('Member Joined')
            .setDescription(`${member} joined the server.`)  
            .setColor("#FF0000")

        gMa1.send(gma1)
    })
})

client.on('guildMemberRemove', async (member) => { 
    db.findOne({ guild: member.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const gma2 = member.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
            .setTitle('Member Left')
            .setDescription(`${member} left the server.`)
            .setColor("#FF0000")

        gma2.send(m)
    })
})


client.on('roleCreate', async (role) => { // when a role is created!
    db.findOne({ guild: role.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const channel = role.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
            .setTitle("Role Update: `Created`")
            .setDescription(`A new role has been created!\n**Role**: ${role}`)
            .setColor("#FF0000")

        channel.send(m)
    })
})

client.on('roleDelete', async (role) => { // when a role is deleted!
    db.findOne({ guild: role.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const channel = role.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
            .setTitle('Role Update: `Deleted`')
            .setDescription(`A role has been deleted!\n**Role**: ${role.name}`)
            .setColor("#FF0000")

        channel.send(m)
    })
})

client.on('channelCreate', async (channel) => { // when a channel is created
    db.findOne({ guild: channel.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const chann = channel.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
            .setTitle('Channel Update: `Created`')
            .setDescription(`A new channel has been created!\n**Channel**: ${channel}`)
            .setColor("#FF0000")

        chann.send(m)
    })
})

client.on('channelDelete', async (channel) => { // finally when the channel is deleted
    db.findOne({ guild: channel.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const chann = channel.guild.channels.cache.get(ch);

        const m = new MessageEmbed()
            .setTitle('Channel Update: `Deleted`')
            .setDescription(`A channel has been deleted!\n**Channel**: ${channel.name}`)
            .setColor("#FF0000")

        chann.send(m)
    })
})

client.on("emojiCreate", async (emoji) => {
    db.findOne({ guild: emoji.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const chan1 = emoji.guild.channels.cache.get(ch);

        const emojiEmbed = new MessageEmbed()
            .setTitle('Emoji Update: `Created`')
            .setDescription(`A new emoji has been created.\n\n**Emoji**: ${emoji}`)
            .setColor('#FF0000')

        chan1.send(emojiEmbed)
    })
})

client.on("emojiDelete", async (emoji) => {
    db.findOne({ guild: emoji.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const chan2 = emoji.guild.channels.cache.get(ch);

        const emojiEmbed = new MessageEmbed()
            .setTitle('Emoji Update: `Deleted`')
            .setDescription(`An emoji has been deleted.\n**Emoji name**: ${emoji.name}`)
            .setColor('#FF0000')

        chan2.send(emojiEmbed)
    })
})

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
    db.findOne({ guild: oldEmoji.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const chan3 = oldEmoji.guild.channels.cache.get(ch);

        if (oldEmoji.name !== newEmoji.name) {



            const emojiUpdateEmbed = new MessageEmbed()
                .setTitle('Emoji Update: `Name Changed`')
                .setDescription(`An emoji name has been changed.\n**Before**: \`${oldEmoji.name}\`\n**After**: \`${newEmoji.name}\``)
                .setColor('#FF0000')

            chan3.send(emojiUpdateEmbed)
        }
    })
})

client.on("guildBanAdd", async (guild, user) => {
    db.findOne({ guild: guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const ban1 = guild.channels.cache.get(ch);

        const ban1Embed = new MessageEmbed()
            .setTitle('Bans Update: `Add`')
            .setDescription(`**${user}** was banned from **${guild.name}**`)
            .addField('ID', `\`${user.id}\``)
            .setColor('#FF0000')

        ban1.send(ban1Embed)
    })
})

client.on("guildBanRemove", async (guild, user) => {
    db.findOne({ guild: guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const ban2 = guild.channels.cache.get(ch);

        const ban2Embed = new MessageEmbed()
            .setTitle('Bans Update: `Remove`')
            .setDescription(`**${user}** was unbanned from **${guild.name}**`)
            .addField('ID', `\`${user.id}\``)
            .setColor('#FF0000')

        ban2.send(ban2Embed)
    })
})

client.on("messageDelete", async (message) => {
    db.findOne({ guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const msg1 = message.guild.channels.cache.get(ch);

        if (message.channel.type !== "text") return;

        const msg1Embed = new MessageEmbed()
            .setTitle('Message Update: `Delete`')
            .setDescription(`${message.author}'s message was **deleted** in ${message.channel}`)
            .addField('Message:', `\`${message}\``)
            .setColor('#FF0000')

        msg1.send(msg1Embed)
    })
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
    db.findOne({ guild: oldMessage.guild.id }, async (err, data) => {
        if (!data) return;
        const ch = data.channel;
        const msg2 = oldMessage.guild.channels.cache.get(ch);


        if (oldMessage.content === newMessage.content) return;

        const msg2Embed = new MessageEmbed()
            .setTitle('Message Update: `Edit`')
            .setDescription(`${oldMessage.author}'s message was **edited** in ${oldMessage.channel}`)
            .addField('Before:', `\`${oldMessage}\``)
            .addField('After: ', `\`${newMessage}\``)
            .setColor('#FF0000')

        msg2.send(msg2Embed)
    })
})

// client.on("messageDeleteBulk", async (messages) => {
//     db.findOne({ guild: messages.guild.id }, async (err, data) => {
//         if (!data) return;
//         const ch = data.channel;
//         const msg3 = messages.guild.channels.cache.get(ch);

//         const msg3Embed = new MessageEmbed()
//             .setTitle('Message Update: `Bulk Delete`')
//             .setDescription(`${messages.length} messages were **deleted** in ${messages.channel}`)
//             .setColor('#FF0000')

//         msg3.send(msg3Embed)
//     })
// })
