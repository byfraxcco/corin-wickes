import Command from "../../structures/classes/command";

export default new Command({
    data: {
        name: "avatar",
        description: "Shows user avatar's",
        options: [
            {
                type: 6,
                name: "user",
                description: "The user to show the avatar",
                required: false,
            },
        ],
    },

    async execute(client, interaction) {
        const user = interaction.options.getUser("user") || interaction.user;
        const avatar = user.displayAvatarURL({ size: 4096, extension: "png", forceStatic: false })
        
        client.embed.setImage(avatar);
        client.embed.setDescription(`[Default Avatar](${user.defaultAvatarURL}), [User Avatar](${avatar})`);

        return interaction.reply({ embeds: [client.embed] });
    },
});