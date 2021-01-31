const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();

const config = {
	description: 'Sends your suggestion in <#772868459520458752>.',
	aliases: [],
	usage: '<msg>',
	rolesRequired: [],
	category: 'Suggestion System'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		let suggestion = args.join(' ');
		if (!suggestion) {
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
		let suggestionChannel = await client.channels.cache.get(
			client.config.suggestionChannelId
		);
		let suggestionEmbed = new Discord.MessageEmbed();

		let filter = (reaction, user) =>
			['✅', '❌'].includes(reaction.emoji.name) &&
			user.id === message.author.id;
		embed.setTitle('Prompt');
		embed.setDescription(
			`Are you sure you want to send this suggestion? Remember, any form of troll suggestion can result in a consequence.\n` +
				`\n` +
				`You will send this:\n` +
				`\`\`\`${suggestion}\`\`\``
		);
		embed.setColor(client.config.colors.BLUE);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setFooter(
			`Bristo Bakery Systems | Made by Carexfullyy#0284`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		let msg = await message.channel.send(embed);
		await msg.react('✅');
		await msg.react('❌');
		msg
			.awaitReactions(filter, { max: 1, time: 60000 })
			.then(async collected => {
				if (collected.size === 0) {
					msg.reactions.removeAll();
					embed.setColor(client.config.colors.RED);
					embed.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL()
					);
					embed.setTitle('Prompt Cancelled');
					embed.setDescription(
						'You took too long. Run the command again to try again.'
					);
					embed.setFooter(
						`Prompt Cancelled! | System Error`,
						`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
					);
					return msg.edit(embed);
				}

				if (collected.first().emoji.name === '❌') {
					msg.reactions.removeAll();
					embed.setColor(client.config.colors.RED);
					embed.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL()
					);
					embed.setTitle('Prompt Concluded');
					embed.setDescription('I did not send the suggestion.');
					embed.setFooter(
						`Bristo Bakery | System`,
						`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
					);
					return msg.edit(embed);
				}

				if (collected.first().emoji.name === '✅') {
					msg.reactions.removeAll();
					embed.setColor(client.config.colors.YELLOW);
					embed.setAuthor(
						message.author.username,
						message.author.displayAvatarURL()
					);
					embed.setDescription(suggestion);
					embed.addFields({
						name: `Status`,
						value: `📊 Waiting for community feedback, please vote!`
					});
					embed.setFooter(
						`Want to suggest something? Run the command ${
							client.config.prefix
						}suggest!`
					);
					suggestionChannel.send(embed).then(message => {
						message.react('👍').then(() => {
							message.react('👎');
						});
					});

					let successEmbed = new Discord.MessageEmbed();

					successEmbed.setColor(client.config.colors.GREEN);
					successEmbed.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL()
					);
					successEmbed.setTitle('Prompt Concluded');
					successEmbed.setDescription(
						`**Success!** I have sent your suggestion to the <#${
							client.config.suggestionChannelId
						}> channel.`
					);
					successEmbed.setFooter(
						`Bristo Bakery Systems | Made by Carexfullyy#0284`,
						`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
					);
					msg.edit(successEmbed);
				}
			});
	}
};
