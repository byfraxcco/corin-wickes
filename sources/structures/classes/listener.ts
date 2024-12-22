import Client from "../client";
import discord from "discord.js";

interface ListenerOptions<key extends keyof discord.ClientEvents> {
    name: key,
    execute: (client: Client, ...args: discord.ClientEvents[key]) => void;
};

export default class Listener<key extends keyof discord.ClientEvents> {
    public name: ListenerOptions<key>["name"];
    public execute: ListenerOptions<key>["execute"];

    constructor(options: ListenerOptions<key>) {
        Object.assign(this, options);
    };
};