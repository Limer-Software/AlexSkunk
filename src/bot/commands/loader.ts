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

import { REST, Routes } from 'discord.js';

import crypto from 'crypto';

import Cache from '../../cache';
import client from '../../client';

import * as commands from './index';


// Load commands
const hashStream = crypto.createHash('sha256');

for (const entry of Object.values(commands as Record<string, { command: RSDiscord.Command }>)) {
	client.commands.set(entry.command.data.name, entry.command);

	hashStream.update(JSON.stringify(entry.command.data.toJSON()));
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
