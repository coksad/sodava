const Discord = require('discord.js');
const path = require('path');

const config = {
	description: 'Marks a suggestion as invalid with your reason.',
	aliases: [],
	usage: '<message Id> <reason>',
	rolesRequired: ['Senior Leadership Team', 'Leadership Team', 'Chairman'],
	category: 'Suggestion System'
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
		let reason = args.slice(1).join(' ');
		if (!reason) {
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
		let suggestionChannel = client.channels.cache.get(
			client.config.suggestionChannelId
		);
		if (!suggestionChannel) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`The suggestion channel that set in the config file is not valid or did not provide the channel ID.`
			);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		const targetMessage = await suggestionChannel.messages.fetch(
			messageId,
			false,
			true
		);
		if (!targetMessage) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(`That message doesn't exist.`);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		const oldEmbed = targetMessage.embeds[0];
		embed.setColor(client.config.colors.BLACK);
		embed.setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL);
		embed.setDescription(oldEmbed.description);
		embed.addFields({
			name: `Marked invalid by ${message.author.tag} (${message.author.id})`,
			value: reason
		});
		embed.setFooter(
			`Want to suggest something? Run the command: ${
				client.config.prefix
			}suggest!`
		);
		targetMessage.edit(embed);

		let successEmbed = new Discord.MessageEmbed();
		successEmbed.setColor(client.config.colors.GREEN);
		successEmbed.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL()
		);
		successEmbed.setDescription(
			`**Success!** I have sent back the feedback to the selected suggestion.`
		);
		successEmbed.setFooter(
			`Bristo Bakery | System`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		message.channel.send(successEmbed);
	}
};
