const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Obtener información sobre el bot."),

    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;

        const memoryUsage = formatBytes(process.memoryUsage().heapUsed);
        const node = process.version;

        const embed = new EmbedBuilder()
            .setTitle("Información del bot")
            .setColor("Blue")
            .addFields(
                { name: "Desarrollador", value: "SebasLee", inline: true },
                { name: "Nombre de usuario", value: `${client.user.username}`, inline: true },
                { name: "ID", value: `${client.user.id}`, inline: true },
                { name: "Fecha de creación", value: `Soon...` },
                { name: "Comando de ayuda", value: "s!help" },
                { name: "Tiempo de actividad", value: `\`${days}\` días, \`${hours}\` horas, \`${minutes}\` minutos y \`${seconds}\` segundos.` },
                { name: "Bot-Ping", value: `${client.ws.ping}ms` },
                { name: "Versión de Node", value: `${node}` },
                { name: "Uso de memoria", value: `${memoryUsage}` }
            );

        await interaction.reply({ embeds: [embed] });
    }
};

function formatBytes(a, b) {
    let c = 1024;
    d = b || 2;
    e = ['B', 'KB', 'MB', 'GB', 'TB'];
    f = Math.floor(Math.log(a) / Math.log(c));

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f];
}
