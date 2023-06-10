import { SlashCommandBuilder } from "discord.js";
import { pipe } from "fp-ts/function";
import * as Either from "fp-ts/Either";
import * as Option from "fp-ts/Option";
import * as Number from "../Number.Extra";
import Command from "../Command";
import * as Clue from "../Clue";

const solve: Command = {
  data: new SlashCommandBuilder()
    .setName("solve")
    .setDescription("Solve a clue by UUID.")
    .addStringOption((option) =>
      option
        .setName("uuid")
        .setDescription("The unique id for the clue.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("answer")
        .setDescription("The answer to the clue.")
        .setRequired(true)
    ),

  execute: (interaction) => {
    const uuid = pipe(
      interaction.options.getString("uuid"),
      Either.fromNullable(new Error("Missing required option: uuid")),
      Either.chain(Number.fromString)
    );

    if (Either.isLeft(uuid)) {
      return interaction.reply({
        content: uuid.left.message,
        ephemeral: true,
      });
    }

    const answer = pipe(
      interaction.options.getString("answer"),
      Either.fromNullable(new Error("Missing required option: answer"))
    );

    if (Either.isLeft(answer)) {
      return interaction.reply({
        content: answer.left.message,
        ephemeral: true,
      });
    }

    return Clue.findByUUID(uuid.right)
      .then((clue) => {
        if (Option.isNone(clue)) {
          return interaction.reply({
            content: `Cannot find clue with uuid ${uuid.right}.`,
            ephemeral: true,
          });
        }

        const guess = answer.right.toUpperCase();
        const actual = clue.value.answer.toUpperCase();

        if (guess !== actual) {
          return interaction.reply(
            `❌ ${interaction.user.username} submitted an **incorrect** solution: ||${guess}||.`
          );
        }

        return interaction.reply(
          `✅ ${interaction.user.username} submitted a **correct** solution: ||${guess}||.`
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

export default solve;
