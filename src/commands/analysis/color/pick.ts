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

import { SlashCommandSubcommandBuilder } from 'discord.js';
import GenerateColorEmbed from './__generator__';


const hexColorRegex = /^#([0-9a-f]{6})$/i;


const data = new SlashCommandSubcommandBuilder();

data.setName('pick');

data.setDescription('Get information about a color.');
data.setDescriptionLocalizations({
	'es-ES': 'Obtén información sobre un color.'
});

data.addStringOption(option => {
	option.setName('color');

	option.setDescription('The color to get information about.');
	option.setDescriptionLocalizations({
		'es-ES': 'El color del que se quiere obtener información.'
	});

	option.setRequired(true);

	return option;
});


const command: RSDiscord.SubCommand = {
	data,
	async execute(interaction) {
		const color = interaction.options.getString('color', true);
		var colorValue: number;

		if (hexColorRegex.test(color)) {
			colorValue = Number.parseInt(color.replace('#', ''), 16);

		} else if (Number.isNaN(Number.parseInt(color))) {
			await interaction.reply({
				content: 'Invalid color. If you tried to use a hex color, make sure it\'s in the format `#RRGGBB`.',
				ephemeral: true
			});

			return;
		} else {
			colorValue = Number.parseInt(color);

			if (colorValue < 0 || colorValue > 0xFFFFFF) {
				await interaction.reply({
					content: 'Invalid color.',
					ephemeral: true
				});

				return;
			}
		}


		await interaction.reply(GenerateColorEmbed(colorValue));
	}
};

export default command;
