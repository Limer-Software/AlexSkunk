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

import {
	Collection,
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	CacheType,
	SlashCommandSubcommandBuilder
} from 'discord.js';
import Database from '../database/connection';


declare module 'discord.js'
{
	interface Client
	{
		commands: Collection<string, RSDiscord.Command>;
		database: Database;
	}
}

declare global {

	namespace RSDiscord
	{
		type Command = RootCommand | SubCommand;

		interface RootCommand
		{
			data: SlashCommandBuilder;
			execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
		}
	
		interface SubCommand
		{
			data: SlashCommandSubcommandBuilder;
			execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>;
		}
	}

	namespace NodeJS {
		interface ProcessEnv {
			TOKEN: string;
			APP_ID: string;

			DB_HOST: string;
			DB_PORT: string;
			DB_NAME: string;
			DB_USER: string;
			DB_PASSWORD: string;

			PATH_PREFIX?: string;
			SECURE?: 'true' | 'false';
			DOMAIN: string;

			SHA_SALT: string;

			NODE_ENV?: 'development' | 'production';
			PORT?: string;
		}
	}
}
