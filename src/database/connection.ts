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

import PostgreSQL from 'pg';

class Database
{
	/**
	 * Database connection pool
	 */
	private pool: PostgreSQL.Pool;


	/**
	 * Create a new database connection pool based on environment variables
	 */
	constructor()
	{
		this.pool = new PostgreSQL.Pool({
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			port: Number.parseInt(process.env.DB_PORT),
			user: process.env.DB_USER
		});
	}

	/**
	 * Test the database connection
	 */
	public async testConnection(): Promise<void>
	{
		try {
			await this.pool.query('SELECT NOW()');
			console.log('Connected to database');
		} catch (error) {
			console.error('Failed to connect to database');
			console.error(error);
			process.exit(1);
		}
	}

	/**
	 * Get a client from the connection pool
	 * @returns A client from the connection pool
	 */
	public async connect(): Promise<PostgreSQL.PoolClient>
	{
		return this.pool.connect();
	}
}


export default Database;
