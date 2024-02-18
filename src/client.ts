/*
	Alex Skunk, a discord bot.
	Copyright (C) 2024 RobotoSkunk <contact@robotoskunk.com>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
		Discord.IntentsBitField.Flags.DirectMessageReactions
});

client.commands = new Discord.Collection();


export default client;
