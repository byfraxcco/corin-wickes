import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "ping",
        description: "Shows bot latency"
    },

    async execute(client, interaction) {
        client.embed.setDescription(`Pong! Latency is **${~~client.ws.ping}ms.**`)

        return interaction.reply({ embeds: [client.embed] });
    },
});