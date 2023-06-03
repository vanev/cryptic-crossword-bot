import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import express from "express";
import commands from "./src/commands";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("👋 hello");
});

app.listen(port, () => {
  console.log(`✳️ Application started. Listening on port ${port}.`);
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, ({ user }) => {
  console.log(`🤖Ready. Logged in as ${user.tag}.`);
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(
      `🚨 Could not find command called ${interaction.commandName}.`
    );
    return;
  }

  return command
    .execute(interaction)
    .catch((reason: unknown): Promise<unknown> => {
      console.error(`🚨 ${reason}`);

      if (interaction.replied || interaction.deferred) {
        return interaction.followUp({
          content: "Something went wrong!",
          ephemeral: true,
        });
      } else {
        return interaction.reply({
          content: "Something went wrong!",
          ephemeral: true,
        });
      }
    })
    .then(() => {
      console.log(`🤖 ${interaction.commandName} handled.`);
    });
});

client.login(process.env.DISCORD_BOT_TOKEN);
