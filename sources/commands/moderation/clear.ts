import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "clear",
        description: "Delete a number of messages from a channel or user",
        options: [
            {
                type: 10,
                name: "amount",
                description: "The number of messages to delete (1-99)",
                required: true,
                max_value: 99,
                min_value: 1,
            },
        ]
    },

    async execute(client, interaction) {
        await interaction.deferReply({ ephemeral: true });

        let amount = interaction.options.getNumber("amount");
        const channel = interaction.channel;

        try {            
            const channelMessages = await channel.messages.fetch();

            if(channelMessages.size === 0) {
                client.embed.setDescription("Uh-oh! This channel don't have messages...");
            } else {
                if(amount > channelMessages.size) {
                    amount = channelMessages.size;
                };

                channel.bulkDelete(amount);
            
                client.embed.setDescription(`${amount} messages have been removed from the channel!`);
            };
        } catch {
            client.embed.setDescription("Uh-oh! An unknown error occurred while trying to delete channel messages...")
        };
        
        return interaction.editReply({ embeds: [client.embed] });
    },
});