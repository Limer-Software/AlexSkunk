import Discord from 'discord.js';

const client = new Discord.Client({
	'partials': [
		Discord.Partials.Channel,
		Discord.Partials.GuildMember,
		Discord.Partials.Message,
		Discord.Partials.Reaction,
		Discord.Partials.ThreadMember,
		Discord.Partials.User
	],
	'intents': Discord.IntentsBitField.Flags.Guilds |
		Discord.IntentsBitField.Flags.GuildMessages |
		Discord.IntentsBitField.Flags.GuildMessageReactions |
		Discord.IntentsBitField.Flags.DirectMessages |
		Discord.IntentsBitField.Flags.DirectMessageReactions |
		Discord.IntentsBitField.Flags.GuildMembers |
		Discord.IntentsBitField.Flags.MessageContent
});

client.commands = new Discord.Collection();


export default client;
