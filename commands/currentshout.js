const roblox = require('noblox.js');
const Discord = require('discord.js');
require('dotenv').config();

const config = {
	description: 'Shows the current group shout.',
	aliases: [],
	usage: [],
	rolesRequired: [],
	category: 'Public Group Commands'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		let embed = new Discord.MessageEmbed();
		let shout;
		try {
			shout = await roblox.getShout(client.config.groupId);
		} catch (err) {
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`Opps! An unexpected error has occurred during the usage of this command.\n` +
					`\n` +
					`**__Error message given:__**\n` +
					`${err}`
			);
			embed.setFooter(
				`Bristo Bakery | System Error`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
		roblox.getIdFromUsername(shout.poster.username).then(function(id) {
			roblox.getUsernameFromId(id).then(function(completeUsername) {
				if (shout.body) {
					embed.setColor(client.config.colors.BLUE);
					embed.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL()
					);
					embed.setDescription(
						`This group shout has been posted by [${completeUsername}](https://www.roblox.com/users/${id}/profile):\n` +
							`\`\`\`${shout.body}\`\`\``
					);
					embed.setFooter(
						`Bristo Bakery | System`,
						`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
					);
					embed.setThumbnail(
						`https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
					);
					message.channel.send(embed);
				} else {
					embed.setColor(client.config.colors.BLUE);
					embed.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL()
					);
					embed.setDescription(
						`This group shout has been posted by [${completeUsername}](https://www.roblox.com/users/${id}/profile):\n` +
							`*Group shout cleared.*`
					);
					embed.setFooter(
						`Bristo Bakery | System`,
						`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
					);
					embed.setThumbnail(
						`https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
					);
					message.channel.send(embed);
				}
			});
		});
	}
};
