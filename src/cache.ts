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

import fs from 'fs';
import path from 'path';
import util from 'util';


export default class Cache
{
	private static readonly readFile = util.promisify(fs.readFile);
	private static readonly writeFile = util.promisify(fs.writeFile);
	private static readonly mkdir = util.promisify(fs.mkdir);

	private static readonly path = path.join(process.cwd(), '.cache');

	private static async PrepareCachePath(): Promise<void>
	{
		await this.mkdir(this.path, { recursive: true });
	}


	public static async ReadFile(file: string): Promise<string>
	{
		await this.PrepareCachePath();

		const root = path.join(this.path, file);

		try {
			return await this.readFile(root, 'utf8');
		} catch (_) { }

		return '';
	}

	public static async WriteFile(file: string, data: string): Promise<void>
	{
		await this.PrepareCachePath();

		const root = path.join(this.path, file);

		try {
			await this.writeFile(root, data, 'utf8');
		} catch (_) { }
	}
}
