import { Collection } from "discord.js";
import Command from "../Command";
import ping from "./ping";

const commands = new Collection<string, Command>();

commands.set(ping.data.name, ping);

export default commands;
