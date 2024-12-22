import Client from "../../structures/client";
import discord from "discord.js";

export default (client: Client, interaction: any, member: discord.GuildMember) => {
    const memberRolePosition = member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;
    const requestRolePosition= interaction.member.roles.highest.position;
    let check = false;

    if(interaction.user.id != interaction.guild.ownerId && memberRolePosition >= requestRolePosition) {
        client.embed.setDescription("Uh-oh! that member is equal to or superior to you in roles...");
        
        check = true;
    } else if(memberRolePosition >= botRolePosition) {
        client.embed.setDescription("Uh-oh! That member is equal to or superior to me in roles...");
        
        check = true;
    };

    if (check) {
        return true && interaction.reply({ embeds: [client.embed] });
    } else {
        return false;
    };
};