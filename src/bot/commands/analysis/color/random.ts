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

import { SlashCommandSubcommandBuilder } from 'discord.js';
import GenerateColorEmbed from './__generator__';


const data = new SlashCommandSubcommandBuilder();

data.setName('random');

data.setDescription('Generate a random color and get information about it.');
data.setDescriptionLocalizations({
	'es-ES': 'Genera un color aleatorio y obtén información sobre él.'
});


const command: RSDiscord.SubCommand = {
	data,
	async execute(interaction)
	{
		const colorValue = Math.floor(Math.random() * 0xFFFFFF);

		await interaction.reply(await GenerateColorEmbed(colorValue));
	}
};

export default command;
