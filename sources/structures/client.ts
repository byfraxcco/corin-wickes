import dotenv from "dotenv"
dotenv.config();

import fs from "fs";
import discord from "discord.js";
import Command from "../structures/classes/command";
import Listener from "../structures/classes/listener";

export default class Client extends discord.Client {
    public commands: discord.Collection<string, Command> = new discord.Collection;
    public embed: discord.EmbedBuilder;
    public discord = discord;
    
    constructor() {
        super({ intents: 53608447, allowedMentions: { repliedUser: true, parse: ["users", "roles"] } });
    };

    public loadCommands() {
        for(let folder of fs.readdirSync(`./sources/commands/`)) {
            for(let file of fs.readdirSync(`./sources/commands/${folder}/`)) {
                let command: Command = require(`../commands/${folder}/${file}`).default;
    
                this.commands.set(command.data.name, command);
            };
        };
    };

    public loadListeners() {
        for(let folder of fs.readdirSync(`./sources/listeners/`)) {
            for(let file of fs.readdirSync(`./sources/listeners/${folder}/`)) {
                let listener: Listener<keyof discord.ClientEvents> = require(`../listeners/${folder}/${file}`).default;

                this.on(listener.name, listener.execute.bind(null, this));
            };
        };
    };

    public async start() {
        this.loadCommands();
        this.loadListeners();

        await this.login(process.env.BOT_TOKEN).then(() => {
            console.log("Corin Wickes is now online!");
        });
    };
};