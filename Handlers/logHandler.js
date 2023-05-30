const { EmbedBuilder } = require('discord.js')
const logSchema = require('../Models/logsSchema')

async function logsHandler(client) {
    async function enviarLogs(guildId, embed) {
        const logsData = await logSchema.findOne({ Guild: guildId })
        if (!logsData || !logsData.Channel) return;
        const logChannel = client.channels.cache.get(logsData.Channel);
        if (!logChannel) return;
        embed.setTimestamp()
        try {
            logChannel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error);
        }
    }

    client.on("channelCreate", async (channel) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de crear un nuevo canal**')
            .setDescription(`> **Nombre:** \`${channel.name}\`\n> **Id:** \`${channel.id}\`\n> **Tiempo que fue creado:** \`${channel.createdAt}\`\n> **Channel Tag:** #${channel.url}`)
            .setColor('Green')
            .setFooter({ text: `${channel.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(channel.guild.id, embed)
    })
    client.on("channelDelete", async (channel) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de ELIMINAR un CANAL**')
            .setDescription(`> **Nombre:** \`${channel.name}\`\n> **Id:** \`${channel.id}\`\n> **Tiempo que fue creado:** \`${channel.createdAt}\``)
            .setColor('Red')
            .setFooter({ text: `${channel.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(channel.guild.id, embed)
    })
    client.on("channelUpdate", async (channel, oldChannel, newChannel) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de actualizar un canal**')
            .setDescription(`> **Nombre:** \`${oldChannel}\`\n> **Id:** \`${oldChannel.id}\`\n> **Channel Tag:** #${oldChannel.url}`)
            .setColor('Gold')
            .setFooter({ text: `${channel.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(channel.guild.id, embed)
    })
    client.on("emojiCreate", async (emoji) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de crear un nuevo EMOJI**')
            .setDescription(`> **Nombre:** \`${emoji.name}\`\n> **Id:** \`${emoji.id}\`\n> **Tiempo que fue creado:** \`${emoji.createdAt}\`\n> **Emoji Tag:** ${emoji.url}\n> **Animado:** ${emoji.animated}`)
            .setColor('Green')
            .setFooter({ text: `${emoji.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(emoji.guild.id, embed)
    })
    client.on("emojiDelete", async (emoji) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de ELIMINAR un EMOJI**')
            .setDescription(`> **Nombre:** \`${emoji.name}\`\n> **Id:** \`${emoji.id}\`\n> **Emoji URL:** ${emoji.url}\n> **Animado:** ${emoji.animated}`)
            .setColor('Red')
            .setFooter({ text: `${emoji.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(emoji.guild.id, embed)
    })
    client.on("guildBanAdd", async (ban) => {
        const embed = new EmbedBuilder()
            .setTitle('**ACABAN de BANEAR a un USUARIO**')
            .setDescription(`> **Nombre:** \`${ban.user.tag}\`\n> **Id del usuario:** \`${ban.user.id}\`\n> **Tag del usuario:** <@${ban.user.id}>\n> **Razon:** ${ban.reason}`)
            .setColor('Red')
            .setFooter({ text: `${ban.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(ban.guild.id, embed)
    })
    client.on("guildBanRemove", async (ban) => {
        const embed = new EmbedBuilder()
            .setTitle('**ACABAN de UNBANEAR a un USUARIO**')
            .setDescription(`> **Nombre:** \`${ban.user.tag}\`\n> **Id del usuario:** \`${ban.user.id}\`\n> **Tag del usuario:** <@${ban.user.id}>\n> **Razon:** ${ban.reason}`)
            .setColor('Blue')
            .setFooter({ text: `${ban.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(ban.guild.id, embed)
    })
    client.on("guildMemberUpdate", async (oldMember, newMember) => {
        // Comprobar si ha cambiado el apodo del miembro
        if (oldMember.nickname !== newMember.nickname) {
            console.log(`El apodo de ${newMember.user.tag} ha sido actualizado`);
            const oldNickname = oldMember.nickname ? oldMember.nickname : "ninguno";
            const newNickname = newMember.nickname ? newMember.nickname : "ninguno";
            const embed = new EmbedBuilder()
                .setTitle(`El apodo de ${newMember.user.tag} ha sido actualizado`)
                .setDescription(`> **Antes:** ${oldNickname}\n> **Ahora:** ${newNickname}`)
                .setColor('Aqua')
                .setFooter({ text: `${newMember.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) });

            return enviarLogs(newMember.guild.id, embed);
        }

        // Comprobar si ha cambiado algún rol del miembro
        if (!oldMember.roles.cache.equals(newMember.roles.cache)) {
            const oldRoles = oldMember.roles.cache.map(role => `<@&${role.id}>`).join(", ");
            const newRoles = newMember.roles.cache.map(role => `<@&${role.id}>`).join(", ");
            const addedRoles = [];
            const removedRoles = [];

            for (const role of newMember.roles.cache.values()) {
                if (!oldMember.roles.cache.has(role.id)) {
                    addedRoles.push(`<@&${role.id}>`);
                }
            }

            for (const role of oldMember.roles.cache.values()) {
                if (!newMember.roles.cache.has(role.id)) {
                    removedRoles.push(`<@&${role.id}>`);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(`Los roles de ${newMember.user.tag} han sido actualizados`)
                .setDescription(`> **Antes:** ${oldRoles}\n> **Ahora:** ${newRoles}\n> **Roles agregados:** ${addedRoles.join(", ")}\n> **Roles eliminados:** ${removedRoles.join(", ")}`)
                .setColor('Aqua')
                .setFooter({ text: `${newMember.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) });

            return enviarLogs(newMember.guild.id, embed);
        }

    });
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return
        const embed = new EmbedBuilder()
            .setTitle('Se creo un nuevo mensaje')
            .setDescription(`El mensaje creado es \`${message}\`\n**Autor**: <@${message.author.id}>\n **Fecha:**${message.createdAt} \n Canal: <#${message.channel.id}>`)
            .setColor('DarkButNotBlack')

        return enviarLogs(message.guild.id, embed)
    })
    client.on("messageDelete", async (message) => {
        const embed = new EmbedBuilder()
            .setTitle('Se ELIMINO UN MENSAJE')
            .setDescription(`El mensaje creado es \`${message}\`\n**Autor**: <@${message.author.id}>\n **Fecha:**${message.createdAt} \n Canal: <#${message.channel.id}>`)
            .setColor('Red')

        return await enviarLogs(message.guild.id, embed)
    })
    client.on("roleCreate", async (role) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de CREAR un ROL**')
            .setDescription(`> **Nombre:** \`${role.name}\`\n> **Id:** \`${role.id}\`\n> **Emoji Color:** ${role.color}\n> **HexColor:** ${role.hexColor}\n> **Position:** ${role.rawPosition}`)
            .setColor('DarkerGrey')
            .setFooter({ text: `${role.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(role.guild.id, embed)
    })
    client.on("roleDelete", async (role) => {
        const embed = new EmbedBuilder()
            .setTitle('**Se acaba de ELIMINAR un ROL**')
            .setDescription(`> **Nombre:** \`${role.name}\`\n> **Id:** \`${role.id}\`\n> **Emoji Color:** ${role.color}\n> **HexColor:** ${role.hexColor}\n> **Position:** ${role.rawPosition}`)
            .setColor('Red')
            .setFooter({ text: `${role.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

        return enviarLogs(role.guild.id, embed)
    })
    client.on('voiceStateUpdate', (oldState, newState) => {
        const member = newState.member;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;

        // Si el usuario no estaba en ningún canal de voz antes y se unió a uno
        if (!oldChannel && newChannel) {
            const embed = new EmbedBuilder()
                .setTitle(`El usuario ${member.user.tag} se ha unido al canal ${newChannel.name}`)
                .setColor('Orange')
                .setFooter({ text: `${member.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
            return enviarLogs(member.guild.id, embed);
        }

        // Si el usuario salió de un canal de voz
        if (oldChannel && !newChannel) {
            const embed = new EmbedBuilder()
                .setTitle(`El usuario ${member.user.tag} se a salido del canal ${oldChannel.name}`)
                .setColor('Orange')
                .setFooter({ text: `${member.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
            return enviarLogs(member.guild.id, embed);
        }

        // Si el usuario cambió de canal de voz
        if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
            const embed = new EmbedBuilder()
                .setTitle(`El usuario ${member.user.tag} cambio de ${oldChannel.name} a ${newChannel.name}`)
                .setColor('Orange')
                .setFooter({ text: `${member.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
            return enviarLogs(member.guild.id, embed);
        }
    });



    return console.log('Se cargo correctamente el sistema de logs');
}

module.exports = { logsHandler }