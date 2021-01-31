const roblox = require('noblox.js');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();

const config = {
	description: 'Shows group info or user info.',
	aliases: [],
	usage: '[username/user id] [--id]',
	rolesRequired: [],
	category: 'Public Group Commands'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		let userQuery = args[0];
		if (!userQuery) {
			let group = await client.utils.getGroup(client.config.groupId);
			embed.setDescription(
				`**${group.name} - Group Info**\n\nID: \`${group.id}\`\nOwner: ${
					group.owner.username
				} (\`${group.owner.userId}\`)\nMember Count: ${group.memberCount}\n\n${
					group.publicEntryAllowed
						? `[Join Group](https://roblox.com/groups/${group.id})`
						: `[Request to Join Group](https://roblox.com/groups/${group.id})`
				}`
			);
			embed.setColor(client.config.colors.GREEN);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			return message.channel.send(embed);
		}

		let id;
		try {
			id = await roblox.getIdFromUsername(userQuery);
		} catch (err) {
			embed.setDescription(
				`Opps! ${userQuery} is not a Roblox user. Perhaps you misspelled?`
			);
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setFooter(
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`,
				`Sodava Database`
			);
			return message.channel.send(embed);
		}

		let user;
		try {
			user = await client.utils.getUser(id);
		} catch (err) {
			embed.setDescription(
				`Opps! ${userQuery} is not a Roblox user. Perhaps you misspelled?`
			);
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			return message.channel.send(embed);
		}

		let rankInGroup = await roblox.getRankInGroup(client.config.groupId, id);
		let rankNameInGroup = await roblox.getRankNameInGroup(client.config.groupId, id);
		embed.setDescription(
			`**${user.Username} - User Info**\n\nID: \`${
				user.Id
			}\`\nGroup Rank: ${rankNameInGroup} (\`${rankInGroup}\`)\n\n[Roblox Profile](https://roblox.com/users/${
				user.Id
			}/profile)`
		);
		embed.setColor(client.config.colors.GREEN);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setFooter(
			`Sodava Database`,
			`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
		);
		embed.setThumbnail(
			`https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${user.Id}`
		);
		return message.channel.send(embed);
	}
};
