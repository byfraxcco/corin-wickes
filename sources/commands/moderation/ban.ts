import Command from "../../structures/classes/command";
import checkRoles from "../../functions/validations/checkRoles";

export default new Command({
    data: {
        name: "ban",
        description: "Ban a user from the server",
        defaultMemberPermissions: ["BanMembers"],   
        options: [
            {
                type: 6,
                name: "user",
                description: "The user to be banned",
                required: true,
            },
            {
                type: 3,
                name: "reason",
                description: "The reason for the ban"
            },
        ],
    },

    async execute(client, interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason provided.";

        if(interaction.guild.members.cache.has(user.id)) {
            const member = interaction.guild.members.cache.get(user.id);
            const checkRole = checkRoles(client, interaction, member);

            if(user.id == client.user.id) {
                client.embed.setDescription("Hey! why are you trying to ban me? did i do something wrong...?")
            } else if(user.id == interaction.user.id) {
                client.embed.setDescription("I think you shouldn't ban yourself...");
            } else if(checkRole) {
                checkRole;
            };
        };

        if((await interaction.guild.bans.fetch()).find((b) => b.user.id == user.id)) {
            client.embed.setDescription("Uh-oh! that user is currently already banned");
        } else {
            try {
                await interaction.guild.bans.create(user, { reason: `Banned by: ${interaction.user.username} (${interaction.user.id})\nReason: ${reason}` });
                    
                client.embed.addFields(
                    {
                        name: "Ban Information",
                        value: `**Member banned:** <@${user.id}>\n**Banned by:** <@${interaction.user.id}>\n**Reason:** \`${reason}\``
                    },
                );   
            } catch {
                client.embed.setDescription("Uh-oh! An unknown error occurred while trying to ban the user...");
            };
        };

        return interaction.reply({ embeds: [client.embed] });
    },
});