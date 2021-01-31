const roblox = require('noblox.js');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();

const config = {
	description: 'Demotes a user in the Roblox group.',
	aliases: [],
	usage: '<username> <role name/rank>',
	rolesRequired: [
		'[-] Senior High Ranks',
		'[-] Executive High Ranks',
		'Chairman'
	],
	category: 'Ranking'
};

let getRankFromName = async (func_rankname, func_group) => {
	let roles = await roblox.getRoles(func_group);
	let role = await roles.find(
		rank => rank.name.toLowerCase() === func_rankname.toLowerCase()
	);
	if (!role) {
		return null;
	} else {
		return role.rank;
	}
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();

		let username = args[0];
		if (!username) {
			embed.setDescription(
				`Missing arguments.\n\nUsage: \`${client.config.prefix}${
					path.basename(__filename).split('.')[0]
				}${' ' + config.usage || ''}\``
			);
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Sodava Database`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}
		let id;
		try {
			id = await roblox.getIdFromUsername(username);
		} catch (err) {
			embed.setDescription(
				`Opps! ${username} is not a Roblox user. Perhaps you misspelled?`
			);
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Sodava Database`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}

		let rankInGroup = await roblox.getRankInGroup(client.config.groupId, id);
		let rankingTo = rankInGroup - 1;
		if (client.config.maximumRank <= rankInGroup) {
			embed.setDescription(
				'This bot cannot rank this user due to the maximum rank configured.'
			);
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Sodava Database`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}

		if (rankInGroup === 0) {
			embed.setDescription('That user is not in the group.');
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Sodava Database`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}

		if (client.config.verificationChecks === 'true') {
			let linkedUser = await client.utils.getLinkedUser(
				message.author.id,
				message.guild.id
			);
			if (!linkedUser) {
				embed.setDescription(
					'You must be verified on either of the sites below to use this command.\n\n**Bloxlink:** https://blox.link\n**RoVer:** https://verify.eryn.io'
				);
				embed.setColor(client.config.colors.RED);
				embed.setFooter(
					`Sodava Database`,
					`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				);
				embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
				return message.channel.send(embed);
			}

			if (linkedUser === 'RATE_LIMITS') {
				embed.setDescription('Verification checks are currently on cooldown.');
				embed.setColor(client.config.colors.RED);
				embed.setFooter(
					`Sodava Database`,
					`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				);
				embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
				return message.channel.send(embed);
			}

			if (linkedUser === id) {
				embed.setDescription("You can't rank yourself!");
				embed.setColor(client.config.colors.RED);
				embed.setFooter(
					`Sodava Database`,
					`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				);
				embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
				return message.channel.send(embed);
			}

			let linkedUserRankInGroup = await roblox.getRankInGroup(
				client.config.groupId,
				linkedUser
			);
			if (
				rankInGroup >= linkedUserRankInGroup ||
				rank >= linkedUserRankInGroup
			) {
				embed.setDescription(
					'You can only rank people with a rank lower than yours, to a rank that is also lower than yours.'
				);
				embed.setColor(client.config.colors.RED);
				embed.setFooter(
					`Sodava Database`,
					`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				);
				embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
				return message.channel.send(embed);
			}
		}

		let rankNameInGroup = await roblox.getRankNameInGroup(
			client.config.groupId,
			id
		);
		let rankingInfo;
		try {
			rankingInfo = await roblox.demote(client.config.groupId, id);
		} catch (err) {
			embed.setDescription(
				`Oops! An unexpected error has occured during the usage of this command\n.` +
					`\n` +
					`**Error**\n` +
					`${err}`
			);
			embed.setColor(client.config.colors.RED);
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			return message.channel.send(embed);
		}

		embed.setDescription(
			`**Success!** I have demoted **${username}** from **${rankNameInGroup} (${rankInGroup})** to **${
				rankingInfo.newRole.name
			} (${rankingInfo.newRole.rank})** in the group.`
		);
		embed.setColor(client.config.colors.GREEN);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setFooter(
			`Sodava Database`,
			`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
		);
		embed.setTimestamp();
		message.channel.send(embed);

		if (client.config.logChannelId !== 'false') {
			let logEmbed = new Discord.MessageEmbed();
			let logChannel = await client.channels.fetch(client.config.logChannelId);
			logEmbed.setDescription(
				`**Moderator:** <@${message.author.id}> (\`${
					message.author.id
				}\`)\n**Action:** Demotion\n**User:** ${username} (\`${id}\`)\n**Rank Change:** ${rankNameInGroup} (${rankInGroup}) -> ${
					rankingInfo.newRole.name
				} (${rankingInfo.newRole.rank})`
			);
			logEmbed.setColor(client.config.colors.PURPLE);
			logEmbed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			logEmbed.setFooter(
				`Sodava Database`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			logEmbed.setThumbnail(
				`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${username}`
			);
			return logChannel.send(logEmbed);
		} else {
			return;
		}
	}
};
