import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "unban",
        description: "Unban a user using their ID",
        defaultMemberPermissions: ["BanMembers"],
        options: [
            {
                type: 3, 
                name: "id",
                description: "The ID of the user to be unbanned"
            },
            {
                type: 3,
                name: "reason",
                description: "The reason for the unban"
            }
        ],
    },

    async execute(client, interaction) {
        const id = interaction.options.getString("id");
        const reason = interaction.options.getString("reason") || "No reason provided.";
        
        try {            
            if((await interaction.guild.bans.fetch()).find((b) => b.user.id == id)) {
                interaction.guild.bans.remove(id, `Unbanned by: ${interaction.user.username} (${interaction.user.id})\nReason: ${reason}`);

                client.embed.addFields(
                    {
                        name: "Unban Information",
                        value: `**Member unbanned:** <@${id}>\n**Unbanned by:** <@${interaction.user.id}>\n**Reason:** \`${reason}\``
                    }
                );
            } else {
                client.embed.setDescription("Uh-oh! that user is not banned...");
            };
        } catch {
            client.embed.setDescription("Uh-oh! an unknown error occurred while trying to unban the user...");
        };

        return interaction.reply({ embeds: [client.embed] });
    },
});