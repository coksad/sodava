const Discord = require('discord.js');
const path = require('path');

const config = {
	description: `Bot says what ever the user requested to say`,
	aliases: [],
	usage: '<#channel> <msg>',
	rolesRequired: ['[-] Senior High Ranks', '[-] Executive High Ranks', 'Chairman'],
	category: 'Administration Commands'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		const channel = message.mentions.channels.first();
		if (!channel) {
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
		channel.send(`${args.slice(1).join(' ')}`);
		message.delete();
	}
};
