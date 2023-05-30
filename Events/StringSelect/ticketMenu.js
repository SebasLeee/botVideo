const { PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const ticketSchema = require('../../Models/ticketGuildSchema')
const ticketSupport = require('../../Models/ticketSupportSchema')
const ticketCompras = require('../../Models/ticketBuySchema')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        const { customId } = interaction
        if (interaction.isStringSelectMenu && customId === 'tickets') {
            const valor = interaction.values[0]
            const ticketData = await ticketSchema.findOne({ guildId: interaction.guild.id })
            if (!ticketData) return errReply(interaction, "No se ha creado el sistema de tickets", true)

            switch (valor) {
                case 'soporte':
                    const soporteData = await ticketSupport.findOne({ guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if (soporteData) return errReply(interaction, "Tienes un ticket creado", true)
                    await interaction.guild.channels.create({
                        name: `${interaction.user.username}-ticket`,
                        type: ChannelType.GuildText,
                        parent: ticketData.categorySoporte,
                        permissionsOverwrites: [
                            {
                                id: ticketData.everyoneRol,
                                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                            },
                            {
                                id: interaction.member.id,
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                            },
                        ],
                    }).then(async (channel) => {
                        const newTicketSchema = await ticketSupport.create({
                            guildId: interaction.guild.id,
                            membersId: interaction.member.id,
                            channelId: channel.id,
                            closed: false,
                            open: true,
                            openBy: interaction.user.id,
                        })
                        const embed = new EmbedBuilder()
                            .setColor('DarkButNotBlack')
                            .setDescription(`${interaction.guild.name} SOPORTE\nBienvenido <@${interaction.user.id}> a los tickets de soporte`)
                            .setTimestamp()

                        const button = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('closesupport')
                                .setEmoji('<a:hola4:1099389855617789982>')
                                .setLabel('Cerrar')
                                .setStyle(ButtonStyle.Danger)
                        )

                        await channel.send({ embeds: [embed], components: [button] })
                        return correReply(interaction, "Se creo correctamente el sistema de tickets", true)
                    })
                    break;
                case 'compra':
                    const compraData = await ticketCompras.findOne({ guildId: interaction.guild.id, openBy: interaction.user.id, open: true })
                    if (compraData) return errReply(interaction, "Tienes un ticket creado", true)
                    await interaction.guild.channels.create({
                        name: `${interaction.user.username}-ticket`,
                        type: ChannelType.GuildText,
                        parent: ticketData.categoryBuy,
                        permissionsOverwrites: [
                            {
                                id: ticketData.everyoneRol,
                                deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                            },
                            {
                                id: interaction.member.id,
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                            },
                        ],
                    }).then(async (channel) => {
                        const newTicketSchema = await ticketCompras.create({
                            guildId: interaction.guild.id,
                            membersId: interaction.member.id,
                            channelId: channel.id,
                            closed: false,
                            open: true,
                            openBy: interaction.user.id,
                        })
                        const embed = new EmbedBuilder()
                            .setColor('DarkButNotBlack')
                            .setDescription(`${interaction.guild.name} SOPORTE\nBienvenido <@${interaction.user.id}> a los tickets de soporte`)
                            .setTimestamp()

                        const button = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('closecompras')
                                .setEmoji('<a:hola4:1099389855617789982>')
                                .setLabel('Cerrar')
                                .setStyle(ButtonStyle.Danger)
                        )

                        await channel.send({ embeds: [embed], components: [button] })
                        return correReply(interaction, "Se creo correctamente el sistema de tickets", true)
                    })
                    break;
            }
        }
    }
};
