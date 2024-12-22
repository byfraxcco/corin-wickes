import Listener from "../../structures/classes/listener";

export default new Listener({
    name: "ready",
    async execute(client) {
        const commands = client.commands.map((cmd) => cmd.data);
        client.application.commands.set(commands);

        await client.application.fetch();
        
        client.user.setPresence({
            activities: [
                {
                    type: 3,
                    name: `${client.guilds.cache.size} servers!`,
                },
            ],
        });
    },
});