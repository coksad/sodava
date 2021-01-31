const roblox = require('noblox.js');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();

const config = {
	description: 'Clears the shout in the Roblox group.',
	aliases: ['clear-shout'],
	usage: '',
	rolesRequired: [
		'[-] Senior High Ranks',
		'[-] Executive High Ranks',
		'Chairman'
	],
	category: 'Group Shouts'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();

		let shoutInfo;
		try {
			shoutInfo = await roblox.shout(client.config.groupId, '');
		} catch (err) {
			embed.setDescription(
				`Oops! An unexpected error has occured during the usage of this command\n.` +
					`\n` +
					`**__Error message given:__**\n` +
					`${err}`
			);
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}

		embed.setDescription(`**Success!** Cleared the group shout.`);
		embed.setColor(client.config.colors.GREEN);
		embed.setFooter(
			`Bristo Bakery | System`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		message.channel.send(embed);

		if (client.config.logChannelId !== 'false') {
			let logEmbed = new Discord.MessageEmbed();
			let logChannel = await client.channels.fetch(client.config.logChannelId);
			logEmbed.setDescription(
				`**Moderator:** <@${message.author.id}> (\`${
					message.author.id
				}\`)\n**Action:** Cleared Shout`
			);
			logEmbed.setColor(client.config.colors.PURPLE);
			logEmbed.setFooter(
				`Bristo Bakery | System Logs`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			logEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			logEmbed.setTimestamp();
			return logChannel.send(logEmbed);
		} else {
			return;
		}
	}
};
