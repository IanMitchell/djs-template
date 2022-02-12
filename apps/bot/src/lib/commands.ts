import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export function getSlashCommandKey(
	definition: SlashCommandBuilder | SlashCommandBuilder[]
) {
	if (Array.isArray(definition)) {
		return definition.map((component) => component.name).join("-");
	}

	return definition.name;
}

export function getSerializedCommandInteractionKey(
	interaction: CommandInteraction
) {
	const name = interaction.commandName;
	const group = interaction.options.getSubcommandGroup(false);
	const subcommand = interaction.options.getSubcommand(false);

	return [name, group, subcommand].filter((value) => Boolean(value)).join("-");
}

export function getMergedApplicationCommandData(
	data: SlashCommandBuilder[],
	base: SlashCommandBuilder | null = null
) {
	const command = base ?? data[0];

	const [subcommand, group] = data.slice(1, 3);

	if (
		group != null &&
		group instanceof SlashCommandSubcommandGroupBuilder &&
		subcommand instanceof SlashCommandSubcommandBuilder
	) {
		group.addSubcommand(subcommand);
		command.addSubcommandGroup(group);
	} else if (
		subcommand != null &&
		subcommand instanceof SlashCommandSubcommandBuilder
	) {
		command.addSubcommand(subcommand);
	}

	return command;
}
