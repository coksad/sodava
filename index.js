const express = require('express');
const app = express();

app.get('/', (request, response) => {
	response.sendStatus(200);
});

let listener = app.listen(process.env.PORT, () => {
	console.log(
		'Your app is currently listening on port: ' + listener.address().port
	);
});

const Discord = require('discord.js');
const client = new Discord.Client();
const roblox = require('noblox.js');
const chalk = require('chalk');
const figlet = require('figlet');
const fetch = require('node-fetch');
const fs = require('fs');
const config = require('./config.js');
const utils = require('./utils.js');
require('dotenv').config();

roblox.setCookie(process.env.cookie).catch(async err => {
	console.log(chalk.red('Issue with logging in: ' + err));
});

let commandList = [];
client.commandList = commandList;
client.config = config;
client.utils = utils;
client.databases = {};

const cooldowns = new Discord.Collection();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '.data/db.sqlite',
	logging: false
});

const xpDatabase = sequelize.define('xp', {
	userId: Sequelize.STRING,
	xp: Sequelize.INTEGER
});
xpDatabase.sync();
client.databases.xp = xpDatabase;

let firstShout = true;
let shout;

const onShout = async () => {
	let embed = new Discord.MessageEmbed();
	let shoutChannel = await client.channels.cache.get(
		client.config.shoutChannelId
	);
	if (firstShout == true) {
		firstShout = false;
		shout = await roblox.getShout(client.config.groupId);
		setTimeout(onShout, 30000);
	} else {
		setTimeout(onShout, 30000);
		let currentShout = await roblox.getShout(client.config.groupId);
		if (currentShout.body == shout.body) return;
		if (currentShout.body) {
			embed.setColor(client.config.colors.BLUE);
			embed.setAuthor(
				currentShout.poster.username,
				`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${
					currentShout.poster.username
				}`
			);
			embed.setDescription(`${currentShout.body}`);
			embed.setFooter(
				`Bristo Bakery Services`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setThumbnail(
				`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${
					currentShout.poster.username
				}`
			);
			shoutChannel.send(embed);
		} else {
			embed.setColor(client.config.colors.BLUE);
			embed.setAuthor(
				currentShout.poster.username,
				`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${
					currentShout.poster.username
				}`
			);
			embed.setDescription(`*Shout cleared.*`);
			embed.setFooter(
				`Bristo Bakery Services`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			embed.setThumbnail(
				`https://www.roblox.com/Thumbs/Avatar.ashx?x=150&y=150&format=png&username=${
					currentShout.poster.username
				}`
			);
			shoutChannel.send(embed);
		}
		shout = currentShout;
	}
};
if (client.config.shoutChannelId !== 'false') {
	setTimeout(onShout, 15000);
}

let currentMemberCount = 0;
let firstCheck = true;

let refreshCount = async () => {
	let memberCountChannel = await client.channels.cache.get(
		client.config.memberCount.memberCountChannelId
	);
	let groupResponse = await fetch(
		`https://groups.roblox.com/v1/groups/${client.config.groupId}`
	);
	let groupBody = await groupResponse.json();
	let newCount = groupBody.memberCount;
	if (firstCheck == true) {
		firstCheck = false;
		currentMemberCount = newCount;
		return setTimeout(refreshCount, 30000);
	}
	if (
		client.config.memberCount.milestones.some(
			milestone => newCount > milestone && currentMemberCount < milestone
		)
	) {
		let milestoneReached = client.config.memberCount.find(
			milestone => newCount > milestone && currentMemberCount < milestone
		);
		let embed = new Discord.MessageEmbed();
		embed.setColor(client.config.colors.GREEN);
		embed.setAuthor(groupBody.name, client.config.memberCount.groupIconURL);
		embed.setTitle(`:tada: Milestone reached!`);
		embed.setDescription(
			`${
				groupBody.name
			} just hit the ${milestoneReached} group member count milestone!`
		);
		embed.setFooter(
			`Sodava Database`,
			`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
		);
		embed.setTimestamp();
		embed.setThumbnail(
			`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
		);
		memberCountChannel.send(embed);
	}
	if (newCount !== currentMemberCount) {
		if (newCount > currentMemberCount) {
			let embed = new Discord.MessageEmbed();
			embed.setColor(client.config.colors.BLUE);
			embed.setAuthor(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			embed.addFields(
				{
					name: 'CURRENT COUNT',
					value: newCount
				},
				{
					name: 'OUR GOAL',
					value: client.config.memberCount.milestones
				},
				{
					name: 'MEMBERS AWAY',
					value: client.config.memberCount.milestones - newCount
				}
			);
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			embed.setTimestamp();
			embed.setThumbnail(
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			memberCountChannel.send(embed);
		}
		if (newCount < currentMemberCount) {
			let embed = new Discord.MessageEmbed();
			embed.setColor(client.config.colors.BLUE);
			embed.setAuthor(
				'Sodava Database',
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			embed.addFields(
				{
					name: 'Current Members',
					value: newCount
				},
				{
					name: 'Group Goal',
					value: client.config.memberCount.milestones
				},
				{
					name: 'Members Away',
					value: client.config.memberCount.milestones - newCount
				}
			);
			embed.setFooter(
				`Sodava Database`,
				`https://t6.rbxcdn.com/c5b4bd57eb5a94b67d11df608b663238`
			);
			embed.setTimestamp();
			memberCountChannel.send(embed);
		}
	}
	currentMemberCount = newCount;
	setTimeout(refreshCount, 30000);
};

if (client.config.memberCount.enabled) refreshCount();

fs.readdir('./commands/', async (err, files) => {
	if (err) {
		return console.log(
			chalk.red(
				'An error occured when checking the commands folder for commands to load: ' +
					err
			)
		);
	}
	files.forEach(async file => {
		if (!file.endsWith('.js')) return;
		let commandFile = require(`./commands/${file}`);
		commandList.push({
			file: commandFile,
			name: file.split('.')[0],
			config: commandFile.config
		});
	});
});

client.on('ready', async () => {
	console.log(
		`${chalk.hex(client.config.colors.PURPLE)(
			figlet.textSync('qbot', { horizontalLayout: 'full' })
		)}\n`
	);
	console.log(
		`${chalk.hex('#60bf85')('Bot started!')}\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n` +
			`${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(
				`Servers: ${chalk.hex('#4e5f99')(`${client.guilds.cache.size}`)}`
			)}\n` +
			`${chalk.hex('#ffaa2b')('>')} ${chalk.hex('#7289DA')(
				`Channels: ${chalk.hex('#4e5f99')(`${client.channels.cache.size}`)}`
			)}`
	);
	let botstatus = fs.readFileSync('./bot-status.json');
	botstatus = JSON.parse(botstatus);
	if (botstatus.activity == 'true') return;
	if (botstatus.activitytype == 'LISTENING') {
		client.user.setActivity(botstatus.activitytext, {
			type: botstatus.activitytype,
			url: botstatus.activityurl
		});
	} else {
		client.user.setActivity(botstatus.activitytext, {
			type: botstatus.activitytype
		});
	}
});

client.on('guildMemberAdd', async member => {
	let welcomeChannel = await client.channels.cache.get(
		client.config.welcomeChannelId
	);
	if (!welcomeChannel) return;
	if (member.user.bot) return;
	welcomeChannel.send({
		content: `<@${member.id}>`,
		embed: {
			color: client.config.colors.BLUE,
			title: `:wave: Welcome to the Bristo Bakery community! :wave:`,
			description:
				`:island: | Welcome to the Bristo Bakery community, please ensure that you've read our server rules & information to ensure the best experience from you and your friends.\n` +
				`\n` +
				`:tools: | If you discovered any bugs or glitches within our games, please notify a member of the Development Team.\n` +
				`\n` +
				`:bulb: | If you have any questions or concerns, don't hesitate to contact a committee representing the SHR Team, they will be pleased to answer your questions/concerns.`,
			footer: {
				text: `Signed, Bristo Corporation`,
				icon_url: `https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			}
		}
	});
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(client.config.prefix)) return;
	const args = message.content.slice(client.config.prefix.length).split(' ');
	const commandName = args[0].toLowerCase();
	args.shift();
	const command = commandList.find(
		cmd => cmd.name === commandName || cmd.config.aliases.includes(commandName)
	);
	if (!command) return;

	if (command.config.rolesRequired.length > 0) {
		if (
			!message.member.roles.cache.some(role =>
				command.config.rolesRequired.includes(role.name)
			)
		) {
			let embed = new Discord.MessageEmbed();
			embed.setDescription('You do not have permission to use this command.');
			embed.setColor(client.config.colors.RED);
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setFooter(
				`Bristo Bakery | Protection`,
				`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
			);
			return message.channel.send(embed);
		}
	}

	if (command.config.cooldown) {
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		let currentDate = Date.now();
		let userCooldowns = cooldowns.get(command.name);
		let cooldownAmount = (command.config.cooldown || 3) * 1000;
		if (userCooldowns.has(message.author.id)) {
			let expirationDate =
				userCooldowns.get(message.author.id) + cooldownAmount;
			if (currentDate < expirationDate) {
				let timeLeft = Math.round((expirationDate - currentDate) / 1000);
				let embed = new Discord.MessageEmbed();
				embed.setDescription(
					`This command is currently on cooldown. Please try again in ${timeLeft.toString()} seconds.`
				);
				embed.setColor(client.config.colors.RED);
				embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
				embed.setFooter(
					`Bristo Bakery | Protection`,
					`https://cdn.discordapp.com/attachments/798629244091367444/798629782296199219/1c933d00cb0ccddcff3292dd5f4e4227-2.png`
				);
				return message.channel.send(embed);
			} else {
				userCooldowns.set(message.author.id, currentDate);
			}
		} else {
			userCooldowns.set(message.author.id, currentDate);
		}
	}

	command.file.run(client, message, args);
});

client.login(process.env.token);
