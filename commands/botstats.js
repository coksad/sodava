const Discord = require('discord.js');

const config = {
	description: 'Ability to take a look at the stats of this bot.',
	aliases: ['stats'],
	usage: [],
	rolesRequired: [],
	category: 'Info'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let time = require('ms');
		let uptime = time(client.uptime);
		let embed = new Discord.MessageEmbed();
		embed.setColor(client.config.colors.BLUE);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setTitle('Bot Stats');
		embed.setDescription(
			`**• Uptime: ${uptime}**\n` +
				`**• Users: ${client.users.cache.size}**\n` +
				`**• Servers: ${client.guilds.cache.size}**\n` +
				`**• Channels: ${client.channels.cache.size}**\n` +
				`**• Discord.js: v12.5.1**\n` +
				`**• Node: v12.16.1**`
		);
		embed.setFooter(
			`Bristo Bakery | System`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		return message.channel.send(embed);
	}
};
