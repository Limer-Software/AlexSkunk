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

import { Pool } from 'pg';
import { Kysely, Migrator, PostgresDialect } from 'kysely';

import DatabaseSchema, { DatabaseSchemaType } from './schema';
import { ContextMigrationProvider } from './migrations/provider';

import * as migrations from './migrations';


class Database
{
	/**
	 * Database connection pool
	 */
	private pool: Pool;

	/**
	 * Kysely connection
	 */
	private db: DatabaseSchema;

	/**
	 * Kysely migrator
	 */
	private migrator: Migrator;


	/**
	 * Create a new database connection pool based on environment variables
	 */
	constructor()
	{
		this.pool = new Pool({
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
			password: process.env.DB_PASSWORD,
			port: Number.parseInt(process.env.DB_PORT),
			user: process.env.DB_USER,
		});

		const dialect = new PostgresDialect({ pool: this.pool });
		this.db = new Kysely<DatabaseSchemaType>({ dialect });

		this.migrator = new Migrator({
			db: this.db,
			provider: new ContextMigrationProvider(migrations, 'pg')
		})
	}

	/**
	 * Test the database connection
	 */
	public async testConnection(): Promise<void>
	{
		try {
			// await this.pool.query('SELECT NOW()');

			await this.db
				.selectFrom('users')
				.select([ b => b.fn.count('id').as('count') ])
				.execute();

			console.log('Connected to database.');
		} catch (error) {
			console.error('Failed to connect to database.');
			console.error(error);
			process.exit(1);
		}
	}


	/**
	 * Just a wrapper of migrateTo but with try/catch compatibility.
	 */
	public async tryMigrateTo(migration: string)
	{
		const { error, results } = await this.migrator.migrateTo(migration);
		
		if (error) {
			throw error;
		}

		if (!results) {
			throw new Error('An unknown error ocurred while migrating.');
		}

		return results;
	}


	/**
	 * Just a wrapper of migrateToLatest but with try/catch compatibility.
	 */
	public async tryMigrateToLatest()
	{
		const { error, results } = await this.migrator.migrateToLatest();
		
		if (error) {
			throw error;
		}

		if (!results) {
			throw new Error('An unknown error ocurred while migrating.');
		}

		return results;
	}

	/**
	 * Get a client from the connection pool
	 * @returns A client from the connection pool
	 */
	// public async connect(): Promise<PoolClient>
	// {
	// 	return this.pool.connect();
	// }
}


export default Database;
