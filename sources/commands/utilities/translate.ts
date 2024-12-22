import axios from "axios";
import Command from "../../structures/classes/command";
import locales from "../../functions/assets/locales.json";

export default new Command({
    data: {
        name: "translate",
        description: "Translate a text to another language",
        options: [
            {
                type: 3,
                name: "text",
                description: "Text to translate",
                max_length: 2048,
                required: true,
            },
            {
                type: 3,
                name: "to",
                description: "Language to translate to",
                choices: locales
            },
        ],
    },

    async execute(client, interaction) {
        await interaction.deferReply();

        const text = interaction.options.getString("text");
        const languageto = interaction.options.getString("to");

        try {
            const data = await axios.get(`${process.env.TRANSLATE_API}&tl=${languageto}&q=${text}`).then((d) => d.data);

            client.embed.addFields(
                {
                    name: "Input Text",
                    value: `\`\`\`${text}\`\`\``
                },
                {
                    name: "Output Text",
                    value: `\`\`\`${data[0].map((t: string[]) => t[0]).join("")}\`\`\``
                },
            );
        } catch(error) {
            client.embed.setDescription("Uh-oh! An unknown error occurred while trying get translation result...");
        };

        return interaction.editReply({ embeds: [client.embed] });
    },
});