import { Collection } from "discord.js";
import Command from "../Command";
import clue from "./clue";
import solve from "./solve";

const commands = new Collection<string, Command>();

commands.set(clue.data.name, clue);
commands.set(solve.data.name, solve);

export default commands;
