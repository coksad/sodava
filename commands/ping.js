const config = {
	description: 'Gives information on latency and API response.',
	aliases: ['pong'],
	usage: [],
	rolesRequired: [],
	category: 'Info'
};

module.exports = {
	config,
	run: async (client, message, args) => {
		const pingMessage = await message.channel.send(`🏓 **Ping?**`);
		pingMessage.edit(
			`🏓 **Pong!** Latency is ${pingMessage.createdTimestamp -
				message.createdTimestamp}ms. API latency ${Math.round(
				client.ws.ping
			)}ms.`
		);
	}
};
