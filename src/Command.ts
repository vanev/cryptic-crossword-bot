import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

interface Command {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction) => Promise<unknown>;
}

export default Command;
