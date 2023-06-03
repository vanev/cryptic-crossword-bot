import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import express from "express";

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

client.login(process.env.DISCORD_BOT_TOKEN);
