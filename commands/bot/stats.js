const Discord = require('discord.js');
const superagent = require('superagent');
const osutils = require('os-utils');
const fs = require('fs');
const config = require('../../config.json');
module.exports = {
    name: 'stats',
    aliases: ['botstats'],
    category: 'bot',
    cooldown: 1000,
    description: 'Get information about me',

    run: async (client, message, args) => {
        let totalUsers = 0;
        function sum() {
            client.guilds.cache.forEach(guild => {
                totalUsers += guild.memberCount;
            });
        }
        sum();
        // eslint-disable-next-line prefer-const
        let milliseconds = parseInt((client.uptime % 1000) / 100);
        let seconds = parseInt((client.uptime / 1000) % 60);
        let minutes = parseInt((client.uptime / (1000 * 60)) % 60);
        let hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
        let days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);

        days = (days < 10) ? '0' + days : days;
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        const globalprefix = 's.'
        const serverPrefix = await client.prefix(message)

        let Prefix;
        if (serverPrefix !== null) Prefix = serverPrefix;
        if (serverPrefix == null) Prefix = globalprefix;
        osutils.cpuUsage(function (v) {
            console.log(config.owners);
            const embed = new Discord.MessageEmbed()
                .setColor("#303136")
                .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setTitle(`Bot Statistics`)
                .addField('Global Prefix ', `\`\`\`yaml\n${globalprefix}\`\`\``, true)
                .addField('Total Servers ', `\`\`\`yaml\n ${client.guilds.cache.size}\`\`\``, true)
                .addField('Support Server ', "[Click To Join](https://discord.gg/n89wQ8gSkv)", true)
                .addField('Library ', '```yaml\nDiscord.js v12```', true)
                .addField('Server Prefix ', `\`\`\`yaml\n${Prefix}\`\`\``, true)
                .addField('-----------------------------------------------------------------', '---------------------------------------------------------------')
                // .addField('Platform', `\`\`\`yaml\n${osutils.platform()}\`\`\``, true)
                .addField('CPU Cores', `\`\`\`yaml\n${osutils.cpuCount()}` + ' Cores```', true)
                // .addField('CPU Usage', `\`\`\`yaml\n${(v * 100).toString().split('.')[0] + '.' + (v * 100).toString().split('.')[1].split('')[0] + (v * 100).toString().split('.')[1].split('')[1]}%\`\`\``, true)
                .addField('Total Memory', `\`\`\`yaml\n${osutils.totalmem().toString().split('.')[0] + '.' + osutils.totalmem().toString().split('.')[1].split('')[0] + osutils.totalmem().toString().split('.')[1].split('')[1] + ' MB'}\`\`\``, true)
                .addField('RAM Usage Of VPS', `\`\`\`yaml\n${(osutils.totalmem() - osutils.freemem()).toString().split('.')[0]}/${osutils.totalmem().toString().split('.')[0]} MB (${(100 - osutils.freememPercentage() * 100).toString().split('.')[0] + '.' + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[1]}%)\`\`\``, true)
                .addField('RAM Usage Of Bot', `\`\`\`yaml\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}` + '/' + `${osutils.totalmem().toString().split('.')[0]}` + ' MB\`\`\`', true)
                // .addField('RAM Usage Of VPS', `\`\`\`yaml\n${(100 - osutils.freememPercentage() * 100).toString().split('.')[0] + '.' + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split('.')[1].split('')[1]}%\`\`\``, true)
                .addField('Ping', `\`\`\`yaml\n${Math.round(client.ws.ping)}` + 'ms\`\`\`', true)
                .addField('Uptime', `\`\`\`yaml\n${days + 'd ' + hours + 'h ' + minutes + 'm'}\`\`\``, true)
            message.channel.send({ embed });
        });

    }
}
