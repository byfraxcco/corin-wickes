import util from "util";
import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "eval",
        description: "Eval some code",
        dmPermission: false,
        options: [
            {
                type: 3,
                name: "code",
                description: "Code to evaluate",
                required: true,
            },
            {
                type: 5,
                name: "ephemeral",
                description: "Switch the message on ephemeral",
                required: false,
            }
        ],
    },

    devOnly: true,
    async execute(client, interaction) {
        const code = interaction.options.getString("code");
        const ephemeral = interaction.options.getBoolean("ephemeral");

        client.embed.addFields(
            {
                name: "Input Code",
                value: `\`\`\`ts\n${code}\`\`\``
            },
        );
        
        try {
            const output = util.inspect(eval(code));

            if(output.length > 4096) {
                client.embed.addFields(
                    {
                        name: "Output Code",
                        value: `\`\`\`js\nUh-oh! The output is over 4096 characters...\`\`\``
                    },
                );
            } else {
                client.embed.addFields(
                    {
                        name: "Output Code",
                        value: `\`\`\`js\n${output}\`\`\``
                    },
                );
            };
        } catch(error) {
            client.embed.addFields(
                {
                    name: "Output Code",
                    value: `\`\`\`js\n${error}\n\`\`\``
                },
            );
        };

        return interaction.reply({ embeds: [client.embed], ephemeral: ephemeral });
    },
});