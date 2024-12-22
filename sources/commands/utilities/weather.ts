import axios from "axios";
import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "weather",
        description: "Shows information about the weather in a specific location",
        options: [
            {
                type: 3,
                name: "location",
                description: "The location to shows weather information",
                required: true,
            }
        ]
    },

    async execute(client, interaction) {
        await interaction.deferReply();
        const location = interaction.options.getString("location");
        
        try {
            const data = await axios.get(`${process.env.WEATHER_API}?key=${process.env.WEATHER_API_KEY}&q=${location}`).then((d) => d.data);

            client.embed.setThumbnail(`https:${data.current.condition.icon}`);
            client.embed.addFields(
                {
                    name: `Location Information`,
                    value: `**Name:** \`${data.location.name}\`\n**Region:** \`${data.location.region}\`\n**Country:** \`${data.location.country}\`\n**Timezone ID:** \`${data.location.tz_id}\`\n**Current Time:** <t:${data.location.localtime_epoch}:F>`
                },
                {
                    name: "Weather Information",
                    value: `**Celsius Temperature:** \`${data.current.temp_c}º\`\n**Temperature Feel Like:** \`${data.current.feelslike_c}º\`\n**Weather Condition:** \`${data.current.condition.text}\`\n**Wind Speed:** \`${data.current.wind_kph}kph\`\n**Humidity:** \`${data.current.humidity}%\`\n**Presure:** \`${Math.round(data.current.pressure_mb)} mbar\``
                }
            );
        } catch {
            client.embed.setDescription("Uh-oh! An unknown error occurred while trying get weather information...")
        }

        return interaction.editReply({ embeds: [client.embed] });
    },
});