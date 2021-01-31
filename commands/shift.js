const Discord = require('discord.js');

const config = {
	description: `Announces that a shift is starting in the <#771721809656676373> channel.`,
	aliases: ['startshift'],
	usage: [],
	rolesRequired: [
		'[-] High Ranks',
		'[-] Senior High Ranks',
		'[-] Executive High Ranks',
		'Chairman'
	],
	category: 'Session Announcements'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();

		let shiftChannel = await client.channels.cache.get(
			client.config.shiftChannelId
		);
		shiftChannel.send({
			content: `<@&776026313278357536>`,
			embed: {
				color: client.config.colors.BLUE,
				author: {
					name: message.author.username,
					icon_url: message.author.displayAvatarURL()
				},
				title: `Bristo Bakery | Shift`,
				description:
					`A shift is currently being hosted at the bakery by <@${
						message.author.id
					}>! If you are interested in coming, then feel free to join the Bakery today! MR's are needed.\n` +
					`\n` +
					`:link: - [Click here](https://www.roblox.com/games/4797244072/Work-at-a-Bakery-Bristo)`,
				fields: [
					{
						name: 'Status',
						value: `In Process/On-Going`
					}
				],
				footer: {
					text: `Bristo Bakery | Services`,
					icon_url: `https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				},
				thumbnail: {
					url: `https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				},
				image: {
					url: `https://t4.rbxcdn.com/6d4b08ea072693cad8ac019d7ab0281e`
				}
			}
		});

		message.channel.send({
			embed: {
				color: client.config.colors.GREEN,
				author: {
					name: message.author.tag,
					icon_url: message.author.displayAvatarURL()
				},
				description: `**Success!** I have shouted your shift session in the <#${
					client.config.shiftChannelId
				}> channel.`,
				footer: {
					text: `Bristo Bakery | System`,
					icon_url: `https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				}
			}
		});
	}
};
