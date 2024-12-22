import Client from "../client";
import discord from "discord.js";

interface CommandOptions {
    data: discord.ChatInputApplicationCommandData
    devOnly?: boolean;
    guildOnly?: boolean; 
    execute: (client: Client, interaction: discord.ChatInputCommandInteraction) => void;
};

export default class Command {
    public data: CommandOptions["data"];
    public devOnly: CommandOptions["devOnly"];
    public guildOnly: CommandOptions["guildOnly"];
    public execute: CommandOptions["execute"];

    constructor(options: CommandOptions) {
        Object.assign(this, options);
    };
};