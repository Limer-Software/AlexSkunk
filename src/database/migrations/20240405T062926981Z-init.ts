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

import { Kysely, sql } from 'kysely';


export async function up(db: Kysely<unknown>): Promise<void>
{
	// users
	await db.schema
		.createTable('users')
		.addColumn('id', 'text', c => c.primaryKey())
		.addColumn('crypto_hash', 'text')

		.addColumn('cached_name', 'text', c => c.notNull())
		.addColumn('cached_avatar_url', 'text', c => c.notNull())

		.addColumn('birthdate', 'date')

		.addColumn('ds_access_token', 'text')
		.addColumn('ds_refresh_token', 'text')
		.addColumn('ds_token_expires_at', 'timestamp')
		.addColumn('ds_token_scope', 'text')

		.addColumn('is_admin', 'boolean', c => c.notNull().defaultTo(false))

		.execute();


	// guilds
	await db.schema
		.createTable('guilds')
		.addColumn('id', 'text', c => c.primaryKey())

		.addColumn('embeds_color', 'integer')
		.addColumn('banner_buffer', 'bytea')
		.addColumn('reports_tolerance', 'integer')
		.addColumn('settings', 'bigint', c => c.notNull().defaultTo(0))
		.addColumn('captcha_verified_role', 'text')

		.addColumn('xp_per_msg', sql`POINT`)
		.addColumn('xp_name_singular', 'text')
		.addColumn('xp_name_plural', 'text')
		.addColumn('xp_emoji', 'text')
		.addColumn('xp_levelup_messages', sql`TEXT[]`)

		.addColumn('counter_index', 'integer', c => c.notNull().defaultTo(0))
		.addColumn('tickets_index', 'integer', c => c.notNull().defaultTo(0))

		.addColumn('channel_counter', 'text')
		.addColumn('channel_log_roles', 'text')
		.addColumn('channel_log_messages', 'text')
		.addColumn('channel_log_joins', 'text')
		.addColumn('channel_log_message_filter', 'text')

		.execute();


	// guild_users
	await db.schema
		.createTable('guild_users')
		.addColumn('user_id', 'text', c => c.notNull())
		.addColumn('guild_id', 'text', c => c.notNull())
		.addColumn('boop_count', 'bigint', c => c.notNull().defaultTo(0))
		.addColumn('xp', 'bigint', c => c.notNull().defaultTo(0))

		.addForeignKeyConstraint('user_id_fk', [ 'user_id' ], 'users', [ 'id' ])
		.addForeignKeyConstraint('guild_id_fk', [ 'guild_id' ], 'guilds', [ 'id' ])
		.addPrimaryKeyConstraint('user_guild_pk', [ 'user_id', 'guild_id' ])

		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void>
{
	db.schema.dropTable('guild_users');
	db.schema.dropTable('guilds');
	db.schema.dropTable('users');
}
