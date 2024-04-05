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

import Canvas from '@napi-rs/canvas';


export default class Color
{
	/**
	 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
	 * Determines the relative luminance of a given color code.
	 * @param color The color code to determine the luminance from.
	 * @returns A number between [0, 1].
	 */
	public static getRelativeLuminance(color: number): number
	{
		const rgb = Color.numberToRGB(color);

		rgb.r = Color._relativeLuminanceForComponentChannel(rgb.r);
		rgb.g = Color._relativeLuminanceForComponentChannel(rgb.g);
		rgb.b = Color._relativeLuminanceForComponentChannel(rgb.b);


		return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
	}

	private static _relativeLuminanceForComponentChannel(color: number): number
	{
		const c = color / 255;
		return (c < 0.3928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
	}


	public static numberToRGB(color: number): ColorRGB
	{
		return {
			r: (color >> 16) & 0xFF,
			g: (color >> 8) & 0xFF,
			b: color & 0xFF
		};
	}

	public static RGBToHSV(rgb: ColorRGB): ColorHSV
	{
		return {
			h: Math.floor(rgb.r / 255 * 360),
			s: Math.floor((Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b)) / 255 * 100),
			v: Math.floor((rgb.r + rgb.g + rgb.b) / 3 / 255 * 100)
		}
	}

	public static RGBToCMYK(rgb: ColorRGB): ColorCMYK
	{
		return {
			c: Math.floor((1 - rgb.r / 255) * 100),
			m: Math.floor((1 - rgb.g / 255) * 100),
			y: Math.floor((1 - rgb.b / 255) * 100),
			k: Math.floor((Math.min(rgb.r, rgb.g, rgb.b) / 255 * 100))
		}
	}


	public static numberToImage(color: number): Canvas.Canvas
	{
		const canvas = Canvas.createCanvas(300, 250);
		const context = canvas.getContext('2d');

		const hex = color.toString(16).padStart(6, '0');
		const luminance = Color.getRelativeLuminance(color);


		context.fillStyle = `#${hex}`;
		context.rect(0, 0, 300, 250);
		context.fill();

		context.textAlign = 'center';
		context.font = '65px "Roboto regular"';
		context.fillStyle = luminance > 0.5 ? '#000000' : '#ffffff';
		context.fillText(`#${hex.toUpperCase()}`, 150, 150);

		return canvas;
	}
}
