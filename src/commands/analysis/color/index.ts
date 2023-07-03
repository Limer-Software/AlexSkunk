/*
	Alex Skunk, a discord bot.
	Copyright (C) 2023 RobotoSkunk <contact@robotoskunk.com>

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

import { SlashCommandBuilder } from 'discord.js';
import Discord from 'discord.js';
import GenerateColorEmbed from './__generator__';

import _random_ from './random';
import _pick_ from './pick';


const hexColorRegex = /^#([0-9a-f]{6})$/i;


const data = new SlashCommandBuilder();

data.setName('color');

data.setDescription('Get information about a color or generate a random one.');
data.setDescriptionLocalizations({
	'es-ES': 'Obtén información sobre un color o genera uno aleatorio.'
});

data.addSubcommand(_random_.data);
data.addSubcommand(_pick_.data);

data.setDMPermission(true);

const subCommands: Discord.Collection<string, RSDiscord.SubCommand> = new Discord.Collection();

subCommands.set(_random_.data.name, _random_);
subCommands.set(_pick_.data.name, _pick_);


const command: RSDiscord.RootCommand = {
	data,
	async execute(interaction) {
		const subcommandName = interaction.options.getSubcommand();

		const subcommand = subCommands.get(subcommandName);

		if (!subcommand) {
			return;
		}

		await subcommand.execute(interaction);
	}
};

export default command;
