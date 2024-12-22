import Command from "../../structures/classes/command";
import checkRoles from "../../functions/validations/checkRoles";

export default new Command({
    data: {
        name: "kick",
        description: "Kick user to the server",
        defaultMemberPermissions: ["KickMembers"],
        options: [
            {
                type: 6,
                name: "user",
                description: "The user to kick!"
            },
            {
                type: 3,
                name: "reason",
                description: "The reason for the kick"
            }
        ],
    },

    async execute(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided.";
        
        if(interaction.guild.members.cache.has(user.id)) {
            const member = interaction.guild.members.cache.get(user.id);
            const checkRole = checkRoles(client, interaction, member);

            if(user.id == client.user.id) {
                client.embed.setDescription("Hey! why are you trying to kick me? did i do something wrong...?")
            } else if(user.id == interaction.user.id) {
                client.embed.setDescription("I think you shouldn't kick yourself...");
            } else if(checkRole) {
                checkRole;
            } else {
                try {
                    await interaction.guild.members.kick(member, `Kicked by: ${interaction.user.username} (${interaction.user.id}) Reason: ${reason}`);
                    
                    client.embed.addFields(
                        {
                            name: "Kick Information",
                            value: `**Member kicked:** <@${user.id}>\n**Kicked by:** <@${interaction.user.id}>\n**Reason:** ${reason}`
                        }
                    );
                } catch {
                    client.embed.setDescription("Uh-oh! An unknown error occurred while trying to kick the user...");
                }
            };
        } else {
            client.embed.setDescription("Uh-oh! that user is not on the server...")
        };

        return interaction.reply({ embeds: [client.embed] });
    },
});