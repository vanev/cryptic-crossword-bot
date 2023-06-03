import { SlashCommandBuilder } from "discord.js";
import Command from "../Command";

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong."),

  execute: (interaction) => {
    return interaction.reply("pong");
  },
};

export default ping;
