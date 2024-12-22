import Command from "../../structures/classes/command";
import { dependencies as pkg } from "../../../package.json"

export default new Command({
    data: {
        name: "about",
        description: "Shows information about me!"
    },
    
    async execute(client, interaction) {
        client.embed.addFields(
            {
               name: "About me!",
               value: `**Developer:** [fraxcco](https://discord.com/users/517729180054716416)\n**Language:** \`TypeScript\`\n**Library:** \`Discord.JS (v${pkg["discord.js"]})\`\n**Uptime since:** <t:${Math.floor(client.readyTimestamp / 1000)}:R>` 
            },
            {
                name: "Statistics!",
                value: `**Commands:** \`${client.commands.filter((c) => !c.devOnly).size}\`\n**Guilds:** \`${client.guilds.cache.size}\`\n**Users:** \`${client.users.cache.size}\``
            },
        );

        return interaction.reply({ embeds: [client.embed] });
    },
});