const {EmbedBuilder} = require('discord.js')

module.exports = {
    name: 'sw',
    execute(client, message, args) {
        try {
            const servers = client.guilds.cache.map(guild => {
                return {
                    name: guild.name,
                    ownerName: guild.ownerId,
                    serverid: guild.id,
                    creado: guild.createdAt,
                    miembros: guild.memberCount
                };
            });

            const embed = new EmbedBuilder()
                .setTitle('Servers')
                .addFields({
                    name: 'Informacion General', value: servers.map(server => [`Name: ${server.name}`, `\nDueño del servidor: <@${server.ownerName}> `, `\nMiembros: ${server.miembros}`, `\nId del servidor: ${server.serverid}`, `\nCreado: ${server.creado}`]).join('\n\n')
                })

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            return message.reply({ content: 'Ocurrio un error' })
        }
    }
};
