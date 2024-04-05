/*
	Alex Skunk, a discord bot.
	Copyright (C) 2024  <name of author>

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

import { Kysely, sql } from 'kysely'


export async function up(db: Kysely<unknown>): Promise<void>
{
	// users
	await db.schema
		.createTable('users')
		.addColumn('id', 'text', (c) => c.primaryKey())
		.addColumn('coins', 'bigint', (c) => c.notNull().defaultTo(0))
		.execute();

	// user_spam_reports
	await db.schema
		.createTable('user_spam_reports')
		.addColumn('id', 'uuid', c => c.primaryKey().defaultTo(sql`GEN_RANDOM_UUID()`))
		.addColumn('victim', 'text', c => c.notNull())
		.addColumn('attacker', 'text', c => c.notNull())
		.addColumn('reason', 'text', c => c.notNull())
		.addColumn('created_at', 'timestamp', c => c.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))

		.addForeignKeyConstraint('victim_fk', [ 'victim' ], 'users', [ 'id' ], fk => fk.onDelete('cascade'))
		.addForeignKeyConstraint('attacker_fk', [ 'attacker' ], 'users', [ 'id' ], fk => fk.onDelete('cascade'))

		.execute();

	// for, eg, "reportsCount" in spam evaluation
	await db.schema
		.createIndex('user_spam_reports_idx')
		.on('user_spam_reports')
		.column('victim')
		.execute();

}

export async function down(db: Kysely<unknown>): Promise<void>
{
	// users
	await db.schema.dropTable('users').execute();

	// user_spam_reports
	await db.schema.dropTable('user_spam_reports').execute();
}
