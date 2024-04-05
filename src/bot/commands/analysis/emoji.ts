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

import { GuildEmoji, SlashCommandBuilder } from 'discord.js';
import twemoji from 'twemoji';


const guildEmojiRegex = /<a?:\w+:(\d+)>/;
const wordLetterRegex = /\w/g;
// const unicodeEmojiRegex = /(\p{Emoji}+)/u;

const data = new SlashCommandBuilder();

data.setName('emoji');

data.setDescription('Get information about an emoji.');
data.setDescriptionLocalizations({
	'es-ES': 'Obtiene información sobre un emoji.'
});

data.setDMPermission(true);

data.addStringOption(option => {
	option.setName('emoji');

	option.setDescription('The emoji to get information about.');
	option.setDescriptionLocalizations({
		'es-ES': 'El emoji del que obtener información.'
	});

	option.setRequired(true);

	return option;
});



export const command: RSDiscord.RootCommand = {
	data,
	async execute(interaction)
	{
		const emoji = interaction.options.getString('emoji', true);
		var color: number;

		// Check if it's a guild emoji
		if (guildEmojiRegex.test(emoji)) {

			const emojiId = guildEmojiRegex.exec(emoji)[1];	

			// If the interaction is in a guild
			if (interaction.guild) {
				var guildEmoji: GuildEmoji;
	
				try {
					guildEmoji = await interaction.guild.emojis.fetch(emojiId);
				} catch (_) { }

				color = interaction.guild.members.me.displayColor;

				// If the emoji exists in the guild
				if (guildEmoji) {
					await interaction.reply({
						'embeds': [{
							'title': `Viewing emoji \`${guildEmoji.name}\``,
							'color': color || null,
							'thumbnail': {
								'url': guildEmoji.url
							},
							'description': `[Click here to download](${guildEmoji.url})`,
							'fields': [
								{
									'name': 'ID',
									'value': `\`${guildEmoji.id}\``,
									'inline': true
								}, {
									'name': 'Created at',
									'value': `<t:${Math.floor(guildEmoji.createdTimestamp / 1000)}:R>`,
									'inline': true
								}, {
									'name': 'Created by',
									'value': (await guildEmoji.fetchAuthor()).toString(),
									'inline': false
								}, {
									'name': 'Animated',
									'value': `\`${guildEmoji.animated ? 'Yes' : 'No'}\``,
									'inline': false
								}
							]
						}]
					});

					return;
				}

			}

			// If the emoji doesn't exist in the guild
			const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.png`;

			await interaction.reply({
				'embeds': [{
					'title': 'Emoji',
					'color': color || null,
					'description': 'As this emoji is not in this server, I only have limited information about it.'
						+ '\n\n'
						+ `[Click here to download](${emojiUrl})`,
					'thumbnail': {
						'url': emojiUrl
					}
				}]
			});

			return;
		}

		if (interaction.guild) {
			color = interaction.guild.members.me.displayColor;
		}


		// Check if it's a unicode emoji

		if (wordLetterRegex.test(emoji)) {
			await interaction.reply({
				'content': 'Please provide a valid emoji.',
				'ephemeral': true
			});
			return;
		}

		var unicodeEmoji = emoji;
		// var unicodeEmoji = unicodeEmojiRegex.exec(emoji)[0];

		const parsedEmoji = twemoji.parse(unicodeEmoji);
		const parsedEmojiSVG = twemoji.parse(unicodeEmoji, {
			'folder': 'svg',
			'ext': '.svg'
		});

		const emojiUrl = parsedEmoji.match(/src="([^"]+)"/)[1];

		await interaction.reply({
			'embeds': [
				{
					'title': `Viewing emoji \`${unicodeEmoji}\``,
					'color': color || null,
					'description': `[Click here to download](${emojiUrl})`,
					'thumbnail': {
						'url': emojiUrl
					},
					'fields': [
						{
							'name': 'Raw',
							'value': `\`${unicodeEmoji}\``,
							'inline': true
						}, {
							'name': 'Unicode hex',
							'value': `\`${twemoji.convert.toCodePoint(unicodeEmoji)}\``,
							'inline': true
						}
					]
				}, {
					'title': 'HTML Code',
					'color': color || null,
					'description': '**PNG**\n'
						+ `\`\`\`html\n${parsedEmoji}\`\`\`\n`
						+ '\n**SVG**\n'
						+ `\`\`\`html\n${parsedEmojiSVG}\`\`\``
				}
			]
		});
	}
};
