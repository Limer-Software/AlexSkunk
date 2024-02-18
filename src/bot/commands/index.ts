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

import _emoji_ from './analysis/emoji';
import _color_ from './analysis/color';

const commands: RSDiscord.Command[] = [
	_emoji_,
	_color_
];


// Load commands
import { REST, Routes } from 'discord.js';

import crypto from 'crypto';

import Cache from '../../cache';
import client from '../../client';


const hashStream = crypto.createHash('sha256');

for (const command of commands) {
	client.commands.set(command.data.name, command);

	hashStream.update(JSON.stringify(command.data.toJSON()));
}


(async () => {
	// Check if commands have changed
	const hash = hashStream.digest('hex');

	try {
		const oldHash = await Cache.ReadFile('commandsHash');

		if (oldHash === hash) {
			return;
		}
		
		await Cache.WriteFile('commandsHash', hash);
	} catch (error) {
		console.error(error);
		return;
	}


	// Publish commands
	const rest = new REST().setToken(process.env.TOKEN);
	const commands = client.commands.map(command => command.data.toJSON());
	
	await rest.put(
		Routes.applicationCommands(process.env.APP_ID),
		{ body: commands }
	);

	console.log('Successfully registered application commands.');
})();
