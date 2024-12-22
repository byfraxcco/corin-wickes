import Listener from "../../structures/classes/listener";

export default new Listener({
    name: 'interactionCreate',
    async execute(client, interaction) {
        client.embed = new client.discord.EmbedBuilder().setColor("LightGrey");

        if(interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if(command.devOnly == true && interaction.user.id != (await client.application.fetch()).owner.id) {
                return interaction.reply({ content: "Uh-oh! Unfortunately this command can only be used by my developer, sorry!", ephemeral: true });
            };

            if(command.guildOnly == true && interaction.guild.id != "887378178321023027") {
                return interaction.reply({ content: "Uh-oh! Unfortunately this command can only be used on my development server, sorry!", ephemeral: true });
            };

            return command.execute(client, interaction);
        };
    },
})