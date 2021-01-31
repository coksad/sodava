const Discord = require('discord.js');
const path = require('path');

const config = {
	description: `Edits a shift session status by using message ID.`,
	aliases: [],
	usage: '<message Id> <new status>',
	rolesRequired: [
		'[-] High Ranks',
		'[-] Senior High Ranks',
		'[-] Executive High Ranks',
		'Chairman'
	],
	category: `Session Announcements`
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();

		let messageId = args[0];
		if (!messageId) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`Missing arguments.\n\nUsage: \`${client.config.prefix}${
					path.basename(__filename).split('.')[0]
				}${' ' + config.usage || ''}\``
			);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		let newStatus = args[1];
		if (!newStatus) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`Missing arguments.\n\nUsage: \`${client.config.prefix}${
					path.basename(__filename).split('.')[0]
				}${' ' + config.usage || ''}\``
			);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		let shiftChannel = await client.channels.cache.get(
			client.config.shiftChannelId
		);
		if (!shiftChannel) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`The shift channel is not defined in the config file or is an invalid channel ID.`
			);
			embed.setFooter(
				`Bristo Bakery | System`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		const targetMessage = await shiftChannel.messages.fetch(
			messageId,
			false,
			true
		);
		if (!targetMessage) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(`The message does not exist.`);
			embed.setFooter(
				`Bristo Bakery | System`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		const oldEmbed = targetMessage.embeds[0];
		embed.setColor(client.config.colors.BLUE);
		embed.setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
		embed.setTitle(`Bristo Bakery | Shift`);
		embed.setDescription(oldEmbed.description);
		embed.setFooter(
			`Bristo Bakery | Services`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		embed.setThumbnail(
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		embed.setImage(`https://t4.rbxcdn.com/6d4b08ea072693cad8ac019d7ab0281e`);
		embed.addFields({
			name: `Status`,
			value: newStatus
		});
		targetMessage.edit(embed);

		let successEmbed = new Discord.MessageEmbed();

		successEmbed.setColor(client.config.colors.GREEN);
		successEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		successEmbed.setDescription(
			`**Success!** I have edited your shift session status.`
		);
		successEmbed.setFooter(
			`Bristo Bakery | System`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		message.channel.send(successEmbed);
	}
};
