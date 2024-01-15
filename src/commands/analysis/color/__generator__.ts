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

import { InteractionReplyOptions } from 'discord.js';

export default function GenerateColorEmbed(color: number): InteractionReplyOptions {
	const rgb = {
		r: (color >> 16) & 0xFF,
		g: (color >> 8) & 0xFF,
		b: color & 0xFF
	};

	const hsv = {
		h: Math.floor(rgb.r / 255 * 360),
		s: Math.floor((Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)) / 255 * 100),
		v: Math.floor((rgb.r + rgb.g + rgb.b) / 3 / 255 * 100)
	}

	const cmyk = {
		c: Math.floor((1 - rgb.r / 255) * 100),
		m: Math.floor((1 - rgb.g / 255) * 100),
		y: Math.floor((1 - rgb.b / 255) * 100),
		k: Math.floor((Math.min(rgb.r, rgb.g, rgb.b) / 255 * 100))
	}

	const hex = color.toString(16).padStart(6, '0').toUpperCase();


	return {
		'embeds': [{
			'title': `Color #${hex}`,
			'description':
				`**HSV**: \`${hsv.h}°, ${hsv.s}%, ${hsv.v}%\`\n` +
				`**RGB**: \`${rgb.r}, ${rgb.g}, ${rgb.b}\`\n` +
				`**CMYK**: \`${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%\`\n` +
				`**HEX**: \`#${hex}\`\n` +
				`**Decimal**: \`${color}\``,
			'color': color,
			'image': {
				'url': `https://dummyimage.com/300x250/${hex}/.png&text=${encodeURIComponent(`#${hex}`)}`
			}
		}]
	};
}
