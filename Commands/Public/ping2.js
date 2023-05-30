const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, Client } = require("discord.js")
const os = require("os")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Shows information about the bot"),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {import {'discord.js'}.Client<true>}
         */
        async execute(interaction, client) {
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 23
            let minutes = Math.floor(client.uptime / 60000) % 60
            let seconds = Math.floor(client.uptime / 1000) % 60

            const embed = new EmbedBuilder()
            .setTitle("Bot Status")
            .addFields(
                { name: "Developer", value: "WhiteSlash#8449" },
                { name: "Creation date", value: "23/02/2023" },
                { name: "OS", value: `${os.type()} ${os.release()} ${os.arch()}` },
                { name: "Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` },
                { name: "Language", value: `Node.js` },
                { name: "CPU Usage", value: `${(os.loadavg()[0] * 100).toFixed(2)}%` },
                { name: "Uptime", value: `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` },
                { name: "Ping", value: `${Math.round(interaction.client.ws.ping)} ms` },
                { name: "Servers", value: `${interaction.client.guilds.cache.size}` },
                { name: "Users", value: `${interaction.client.users.cache.size}` },
                )
            .setColor("2B2D31")
            await interaction.reply({ embeds: [embed] })
        }
}