import fs from "fs";
import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "reload",
        description: "Reload all commands and events",
        options: [
            {
                type: 5,
                name: "ephemeral",
                description: "Switch the message on ephemeral",
            }
        ],
    },
    
    devOnly: true,
    async execute(client, interaction) {
        const ephemeral = interaction.options.getBoolean("ephemeral");

        try {
            for(const file of Object.keys(require.cache).filter((files) => !files.includes("node_modules"))) {
                delete require.cache[file];
            };
    
            for(const folder of fs.readdirSync(`./sources/commands`)) {
                let files = fs.readdirSync(`./sources/commands/${folder}/`);
                    
                for(const file of files) {
                    let command: Command = require(`../${folder}/${file}`).default;
    
                    client.commands.set(command.data.name, command);
                    client.embed.setDescription("All commands and listeners reloaded!");
                };
            };   
        } catch(error) {
            console.log(error);

            client.embed.setDescription("Uh-oh! An unknown error occurred while trying to reload all commands and events...");
        };

        return interaction.reply({ embeds: [client.embed], ephemeral: ephemeral });
    },
});