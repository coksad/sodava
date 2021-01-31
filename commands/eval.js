const Discord = require('discord.js');
const path = require('path');

const config = {
	description: `Allows you run a code (JavaScript only!)`,
	aliases: [],
	usage: '<code>',
	rolesRequired: ['Chairman'],
	category: `Bot Developer Commands`
};

module.exports = {
	config,
	run: async (client, message, args) => {
		if(!args[0]){
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(
				`Missing arguments.\n\nUsage: \`${client.config.prefix}${
					path.basename(__filename).split('.')[0]
				}${' ' + config.usage || ''}\``
			);
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			return message.channel.send(embed);
		}
		try {
        const code = args.join(" ");
        let evaled = eval(code);
        if(typeof evaled != "string") {
            evaled = require("util").inspect(evaled);
        }
    } catch (err) {
			embed.setDescription(
				`Oops! An unexpected error has occured during the usage of this command\n.` +
					`\n` +
					`**Error**\n\n` +
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
		embed.setColor(client.config.colors.GREEN);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setDescription(`**Success!** I have complied your code successfully.`);
		embed.setFooter(`Sodava Database`, `https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`);
		return message.channel.send(embed);
	}
}