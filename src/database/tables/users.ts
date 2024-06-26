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


export const tableName = 'users';

export interface Users
{
	id: string;
	crypto_hash: string;

	cached_name: string;
	cached_avatar_url: string;

	birthdate: Date;

	ds_access_token?: string;
	ds_refresh_token?: string;
	ds_token_expires_at?: Date;
	ds_token_scope?: string;

	is_admin?: boolean;
}


export type PartialDB = { [ tableName ]: Users };
