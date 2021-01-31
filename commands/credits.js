const Discord = require('discord.js');

const config = {
	description: 'Gives you a list of credits on this bot.',
	aliases: [],
	usage: [],
	rolesRequired: [],
	category: 'Info'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		embed.setColor(client.config.colors.BLUE);
		embed.setAuthor(message.author.username, message.author.displayAvatarURL());
		embed.setTitle(`Welcome to Bristo Bakery | Credits!`);
		embed.setDescription(`**__Loading Information...__**`);
		embed.addFields(
			{
				name: 'What is Bristo Bakery? Why does this bot exist?',
				value: `Bristo Bakery is a group striving for brilliant experience with all guests that visit. We believe a group is nothing without equality and passion. This bot was made to help assist the amazing SHRs who also do their best to ensure everything runs smoothly by the commands that are listed, feel free to take a look at them by using the \`help\` command.`
			},
			{
				name: 'Maintainer & Existing Date',
				value:
					`Made and running on \`December 29th, 2020\`.\n` +
					`Hosted and maintained by <@788883157764145152> ([Carexfullyy](https://www.roblox.com/users/1571987462/profile)).`
			},
			{
				name: 'Contributor(s)',
				value:
					`<@235929735643922433> ([yogurtsyum](https://www.roblox.com/users/1632672363/profile)) | Layout Support\n` +
					`<@298014369533657090> ([TypicallyShadow](https://www.roblox.com/users/290458196/profile)) | Layout Support`
			}
		);
		embed.setFooter(
			`Powering Great Service`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		return message.channel.send(embed);
	}
};
