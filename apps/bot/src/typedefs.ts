import { SlashCommandBuilder } from "@discordjs/builders";
import {
	CommandInteraction,
	MessageComponent,
	MessageComponentInteraction,
} from "discord.js";
import Application from "~/bot";

type Bot = typeof Application;

export type CommandModule = {
	default: ({ bot }: { bot: Bot }) => unknown;
};

export type CommandArgs = {
	bot: Bot;
};

export type ActionHandler<T> = (interaction: T) => unknown;

export interface BotCommand {
	commands: SlashCommandBuilder[];
	handler: ActionHandler<CommandInteraction>;
}

// export interface BotListener {}

export interface BotComponent {
	component: MessageComponent;
	handler: ActionHandler<MessageComponentInteraction>;
}
