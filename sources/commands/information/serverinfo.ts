import Command from "../../structures/classes/command";
import guildSecurity from "../../functions/assets/guildSecurity.json";
import guildLocales from "../../functions/assets/guildLocales.json";

export default new Command({
    data: {
        name: "serverinfo",
        description: "Show server's informations",
        dmPermission: false,
    },

    async execute(client, interaction) {
        const guild = interaction.guild;

        client.embed.setImage(guild.bannerURL({ size: 4096, extension: "png", forceStatic: false }));
        client.embed.setThumbnail(guild.iconURL({ size: 4096, extension: "png", forceStatic: false }));

        client.embed.setDescription(`\`${guild.description || "No description"}\``)
        client.embed.addFields(
            {
                name: "General",
                value: `**ID:** \`${guild.id}\`\n**Owner:** <@${guild.ownerId}>\n**Locale:** \`${guildLocales[guild.preferredLocale]}\`\n**Created At:** <t:${Math.floor(guild.createdTimestamp / 1000)}:R> (<t:${Math.floor(guild.createdTimestamp / 1000)}:F>)`
            },
            {
                name: "Moderation",
                value: `**AFK Timeout:** \`${guild.afkTimeout / 60} minutes\`\n**MFA:** \`${guildSecurity.mfa_level[guild.mfaLevel]}\`\n**Content Filter:** \`${guildSecurity.explicit_content_filter[guild.explicitContentFilter]}\`\n**Verification Level:** \`${guildSecurity.verification_level[guild.verificationLevel]}\``,
            },
            {
                name: "Counts",
                value: `\`\`\`Channels: ${guild.channels.cache.size}\n├── Text: ${guild.channels.cache.filter((c) => c.type == 0).size}\n├── Voice: ${guild.channels.cache.filter((c) => c.type == 2).size}\n├── Stage: ${guild.channels.cache.filter((c) => c.type == 13).size}\n└── Announcement: ${guild.channels.cache.filter((c) => c.type == 5).size}\n\nEmojis & Stickers: ${guild.emojis.cache.size + guild.stickers.cache.size}\n├── Static: ${guild.emojis.cache.filter((e) => !e.animated).size}\n├── Animated: ${guild.emojis.cache.filter((e) => e.animated).size}\n└── Stickers: ${guild.stickers.cache.size}\n\nMembers: ${guild.members.cache.size}\n├── Bots: ${guild.members.cache.filter((m) => m.user.bot).size}\n└── Humans: ${guild.members.cache.filter((m) => !m.user.bot).size}\`\`\``
            },
            {
                name: "Features",
                value: `\`\`\`${guild.features.join("\n")}\`\`\``
            },
        );

        return interaction.reply({ embeds: [client.embed] });
    },
});