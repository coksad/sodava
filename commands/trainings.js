const Discord = require('discord.js');
const path = require('path');

const config = {
	description: `Announces a training in the <#771721809656676373> channel.`,
	aliases: [],
	usage: '<time> <AM/PM> <timezone>',
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

		let time = args[0];
		if (!time) {
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
		let AMPM = args[1];
		if(!AMPM){
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
		let timezone = args[2];
		if(!timezone){
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
		let trainingChannel = await client.channels.cache.get(client.config.trainingChannelId);
		trainingChannel.send({content: `<@&776026313278357536>`, embed: {
			color: client.config.colors.BLUE,
			author: {
				name: message.author.username,
				icon_url: message.author.displayAvatarURL()
			},
			title: 'Bristo Bakery | Trainings',
			description: `An Training is now being hosted at the training center by <@${message.author.id}>! If you are interested in being employed at Bristo Bakery, feel free to join the Training Center and start working today at Bristo Bakery!\n`
			+ `\n` 
			+ `**Time:** ${time} ${AMPM} ${timezone}\n`
			+ `\n`
			+ `:link: - [Click here](https://www.roblox.com/games/5253439647/Bristo-Bakery-Training-Center)`,
			fields: [
				{
					name: 'Status',
					value: `Awaiting`
				},
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
			},
		}});

		message.channel.send({embed: {
			color: client.config.colors.GREEN,
			author: {
				name: message.author.username,
				icon_url: message.author.displayAvatarURL()
			},
			description: `**Success!** I have shouted your training session in the <#${client.config.trainingChannelId}> channel.`,
			footer: {
				text: `Bristo Bakery | System`,
				icon_url: `https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			},
		}});
	}
};