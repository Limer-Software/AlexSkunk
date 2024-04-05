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


export const tableName = 'guilds';

export interface Guilds
{
	id: string;

	embeds_color?: number;
	banner_buffer?: number;
	reports_tolerance?: number;
	settings: number;
	captcha_verified_role?: string;

	xp_per_msg?: {
		x: string,
		y: string
	};
	xp_name_singular?: string;
	xp_name_plural?: string;
	xp_emoji?: string;
	xp_levelup_messages?: string[];

	counter_index: number;
	tickets_index: number;

	channel_counter?: string;
	channel_log_roles?: string;
	channel_log_messages?: string;
	channel_log_joins?: string;
	channel_log_message_filter?: string;
}


export type PartialDB = { [ tableName ]: Guilds };
