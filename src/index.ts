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

import 'source-map-support/register';
import './env';

import Database from './database/connection';
import client from './client';

import startBot from './bot/index';
import startWebsite from './website/index';


(async () =>
{
	client.database = new Database();

	try {
		await client.database.tryMigrateToLatest();
		await client.database.testConnection();

	} catch (error) {
		console.error(error);
		process.exit(2);
	}


	await startBot();
	await startWebsite();
})();
