const roblox = require('noblox.js');
const Discord = require('discord.js');
require('dotenv').config();

const config = {
	description: 'Gives you a full list of all ranks in the group.',
	aliases: ['rankinfo'],
	usage: [],
	rolesRequired: [],
	category: 'Public Group Commands'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		const getRoles = await roblox.getRoles(client.config.groupId);
		const formattedRoles = getRoles.map(
			r => `\`${r.name}\` - ${r.rank} **(${r.memberCount})**`
		);

		embed.setColor(client.config.colors.BLUE);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setTitle('Rank Information:');
		embed.setDescription(formattedRoles);
		embed.setFooter(
			`Sodava Database`,
			`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
		);
		return message.channel.send(embed);
	}
};
