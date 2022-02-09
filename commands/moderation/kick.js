const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kick people from your server (it\'s fun)',
	run: async (client, message, args, utils) => {

		const p = await client.prefix(message);

		const kickEmbed = new Discord.MessageEmbed()
		.addField("Correct Usage: ", `\`\`\`fix\n${p}kick [@Member] [Reason]\`\`\``)
		.setColor("#ff0000")
		.setFooter("If no reason is mentioned, default reason will be used.")

		if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** I don\'t have the permission to do that! \n Please give me the `KICK MEMBERS` permission!');

		if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('❌**Error:** You don\'t have the permission to do that!');
		let reason = args.slice(1).join(' ');
		const user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined);
		if (!user) return message.lineReply(kickEmbed).catch(console.error);
		if (user.id === message.author.id) return message.lineReply('I can\'t let you do that, self-harm is bad :facepalm:');
		if (user.id === client.user.id) return message.lineReply('You dumb kid, how can you use a bot to kick itself? :joy:');
		if (reason.length < 1) reason = 'No reason supplied';

		if (!message.guild.member(user).kickable) return message.lineReply('I cannot kick that member. Make sure my role is above theirs.');

		const embed = new Discord.MessageEmbed()
			.setColor("#FF0000")
			.setTimestamp()
			.addField('Action:', 'Kick')
			.addField('User:', `${user.tag} (${user.id})`)
			.addField('Moderator:', `${message.author.tag}`)
			.addField('Reason', reason)
		
		message.mentions.users.first().send({ embed }).catch(e => {
			if (e) return;
		});
		message.guild.member(user).kick();
		message.channel.send({ embed });
	}
}