import { Collection } from "discord.js";
import Command from "../Command";
import clue from "./clue";

const commands = new Collection<string, Command>();

commands.set(clue.data.name, clue);

export default commands;
