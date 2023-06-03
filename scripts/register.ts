import { REST, Routes } from "discord.js";
import * as Env from "../src/Env";
import commands from "../src/commands";

console.log("✳️ Starting Command Registration");

const body = [];

for (const [_name, command] of commands) {
  body.push(command.data.toJSON());
}

const token = Env.getRequired("DISCORD_BOT_TOKEN");
const rest = new REST().setToken(token);

const appId = Env.getRequired("DISCORD_APPLICATION_ID");

rest
  .put(Routes.applicationCommands(appId), { body })
  .then(() => console.log("✅ Registered commands."))
  .catch((reason) => console.error(`🚨 ${reason}`));
