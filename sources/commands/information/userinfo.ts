import axios from "axios";
import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "userinfo",
        description: "Show user's information",
        options: [
            {
                type: 6,
                name: "user",
                description: "Get user informations!",
                required: false,
            },
        ],
    },

    async execute(client, interaction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const data = await axios.get(`https://discord.com/api/users/${user.id}`, { headers: { Authorization: `Bot ${client.token}` }}).then((data) => data.data);

        client.embed.setImage(`https://cdn.discordapp.com/banners/${user.id}/${data.banner}.${data.banner?.startsWith("a_") ? "gif" : "png"}?size=4096` || null)
        client.embed.setThumbnail(user.displayAvatarURL({ size: 4096, extension: "png", forceStatic: false }));
        
        client.embed.addFields(
            {
                name: "User Information",
                value: `**ID:** \`${user.id}\`\n**Name:** \`${user.username} (${user.globalName || "None"})\`\n**Bot:** \`${user.bot ? "Yes" : "No"}\`\n**User since:** <t:${Math.floor(user.createdTimestamp / 1000)}:R> (<t:${Math.floor(user.createdTimestamp / 1000)}:F>)`
            },
        );

        if(interaction.guild && interaction.guild.members.cache.has(user.id)) {
            const member = interaction.guild.members.cache.get(user.id);

            client.embed.addFields(
                {
                    name: "Member Information",
                    value: `**Nickname:** \`${member.nickname || "None"}\`\n**Boosting since:** ${member.premiumSince ? `<t:${Math.ceil(member.premiumSinceTimestamp / 1000)}:R> (<t:${Math.ceil(member.premiumSinceTimestamp / 1000)}:F>)` : `\`No boosting\``}\n**Member since:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R> (<t:${Math.floor(member.joinedTimestamp / 1000)}:F>)`
                },
                {
                    name: `Roles (${member.roles.cache.filter((role) => role.name !== "@everyone").size})`,
                    value: member.roles.cache.filter((role) => role.name !== "@everyone").map((role) => role).join(", ")
                },
            );
        };

        return interaction.reply({ embeds: [client.embed] });
    },
});