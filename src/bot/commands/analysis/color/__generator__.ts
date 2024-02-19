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

import { AttachmentBuilder, InteractionReplyOptions } from 'discord.js';

import Color from '../../../../utils/color';


export default async function GenerateColorEmbed(color: number): Promise<InteractionReplyOptions>
{
	const rgb = Color.numberToRGB(color);
	const hsv = Color.RGBToHSV(rgb);
	const cmyk = Color.RGBToCMYK(rgb);
	const hex = color.toString(16).padStart(6, '0').toUpperCase();

	// Create color image
	const canvas = Color.numberToImage(color);

	// Prepare attachment
	const filename = `color-${hex}.png`
	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: filename });


	// Return embed
	return {
		embeds: [{
			title: `Color #${hex}`,
			description:
				`**HSV**: \`${hsv.h}°, ${hsv.s}%, ${hsv.v}%\`\n` +
				`**RGB**: \`${rgb.r}, ${rgb.g}, ${rgb.b}\`\n` +
				`**CMYK**: \`${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%\`\n` +
				`**HEX**: \`#${hex}\`\n` +
				`**Decimal**: \`${color}\``,
			color: color,
			image: {
				url: `attachment://${filename}`
			}
		}],
		files: [
			attachment
		]
	};
}
