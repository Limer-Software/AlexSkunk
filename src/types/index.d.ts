import {
	Collection,
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	CacheType,
	SlashCommandSubcommandBuilder
} from 'discord.js';


declare module 'discord.js'
{
	interface Client
	{
		commands: Collection<string, RSDiscord.Command>;
	}
}

declare global {
	namespace RSDiscord
	{
		type Command = RootCommand | SubCommand;

		interface RootCommand
		{
			data: SlashCommandBuilder;
			execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
			loader?(): Promise<void>;
		}
	
		interface SubCommand
		{
			data: SlashCommandSubcommandBuilder;
			execute: (interaction: ChatInputCommandInteraction<CacheType>) => void;
		}
	}
}
