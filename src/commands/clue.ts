import { SlashCommandBuilder } from "discord.js";
import { pipe } from "fp-ts/function";
import { isLeft, chain, fromNullable } from "fp-ts/Either";
import { isNone } from "fp-ts/Option";
import Command from "../Command";
import { fromString, toString } from "../ClueId";
import { findRandomById } from "../Clue";

const clue: Command = {
  data: new SlashCommandBuilder()
    .setName("clue")
    .setDescription("Get a clue by id.")
    .addStringOption((option) =>
      option
        .setName("clue_id")
        .setDescription(
          "A number and 'A' for across or 'D' for down; e.g. '5D'."
        )
        .setRequired(true)
    ),

  execute: (interaction) => {
    const clueId = pipe(
      interaction.options.getString("clue_id"),
      fromNullable(new Error("Missing required option: clue_id")),
      chain(fromString)
    );

    if (isLeft(clueId)) {
      return interaction.reply({
        content: clueId.left.message,
        ephemeral: true,
      });
    }

    return findRandomById(clueId.right)
      .then((clue) => {
        if (isNone(clue)) {
          return interaction.reply({
            content: `Cannot find clue with id ${toString(clueId.right)}.`,
            ephemeral: true,
          });
        }

        return interaction.reply(
          `UUID: ${clue.value.uuid} 🔎 ${clue.value.clue}`
        );
      })
      .catch((reason) => {
        return interaction.reply({
          content: `${reason}`,
          ephemeral: true,
        });
      });
  },
};

export default clue;
