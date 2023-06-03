import dotenv from "dotenv";
import { REST, Routes } from "discord.js";
import commands from "../src/commands";

dotenv.config();

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) throw new Error("Missing discord bot token.");

const applicationId = process.env.DISCORD_APPLICATION_ID;
if (!applicationId) throw new Error("Missing discord bot token.");

console.log("✳️ Starting Command Registration");

const body = [];

for (const [_name, command] of commands) {
  body.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

rest
  .put(Routes.applicationCommands(applicationId), { body })
  .then(() => {
    console.log("✅ Registered commands.");
  })
  .catch((reason) => {
    console.error(`🚨 ${reason}`);
  });
