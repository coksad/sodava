const Discord = require('discord.js');
const path = require('path');

const config = {
	description: 'Ask 8ball your most hidden questions!',
	aliases: [],
	usage: '<question>',
	rolesRequired: [],
	category: 'Fun Commands'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		if (!args[0]) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`Missing arguments.\n\nUsage: \`${client.config.prefix}${
					path.basename(__filename).split('.')[0]
				}${' ' + config.usage || ''}\``
			);
			embed.setFooter(
				`Sodava Utility`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		let replies = [
			'Yes.',
			'No.',
			'Ask again later.',
			'Maybe.',
			'Yes and definitely.',
			'It is certain.',
			'As I see it, yes.',
			'Very doubtful.',
			'Eh, I will say yes to that.',
			'NO!',
			'Never.',
			'Nope.'
		];

		let result = Math.floor(Math.random() * replies.length);
		let question = args.join(' ');

		embed.setColor(client.config.colors.BLUE);
		embed.setDescription(`**Questions:** ${question}`);
		embed.addFields({
			name: `Magic 8-ball response :8ball:`,
			value: replies[result]
		});
		message.channel.send(embed);
	}
};
