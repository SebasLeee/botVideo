const { PermissionFlagsBits, SlashCommandBuilder, ChatInputCommandInteraction, StringSelectMenuBuilder, StringSelectMenuComponent, StringSelectMenuOptionBuilder, ActionRowBuilder, ChannelType, EmbedBuilder } = require('discord.js')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const ticketSchema = require('../../Models/ticketGuildSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Crea un sistema de tickets para tu servidor de discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal donde se mmostrara el ticket')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channellogs')
                .setDescription('Elige el canal donde se mmostrara los logs')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channelsupport')
                .setDescription('Elige la categoria donde se mostrara los tickets de soporte')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channelbuy')
                .setDescription('Elige la categoria donde se mostrara los tickets de compras')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('handlers')
                .setDescription('Elige el rol del staff')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('everyone')
                .setDescription('Elige el rol everyone')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const channelDisplay = options.getChannel('channel')
        const channelLogs = options.getChannel('channellogs')
        const categorySupport = options.getChannel('channelsupport')
        const categoryBuy = options.getChannel('channelbuy')
        const everyoneRol = options.getRole('everyone')
        const handlerRol = options.getRole('handlers')

        if (!everyoneRol.name === 'everyone') return errReply(interaction, "El rol everyone no es el correcto", true)

        const menu = new StringSelectMenuBuilder()
            .setCustomId('tickets')
            .setPlaceholder('ELIGE LA OPCION QUE NECESITES')
            .setMinValues(1)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setDescription('SI NECESITAS SOPORTE ELIGE ESTA CATEGORIA')
                    .setLabel('SOPORTE')
                    .setEmoji('<:7256staricon:1101865000299151360>')
                    .setValue('soporte'),
                new StringSelectMenuOptionBuilder()
                    .setDescription('SI NECESITAS AYUDA EN LA COMPRA ELIGE ESTA CATEGORIA')
                    .setLabel('COMPRA')
                    .setEmoji('<:2800odnoklassnikiflushed:1101923578066243735> ')
                    .setValue('compra')
            )
        const row = new ActionRowBuilder().addComponents(menu)

        const embed = new EmbedBuilder()
            .setTimestamp()
            .setColor('DarkButNotBlack')
            .setDescription(`**Tickets ${interaction.guild.name}**\nSISTEMA DE TICKETS Y AYUDA DE ESTE SERVIDOR`)
            .setFooter({ text: `AYUDA Y SOPORTE`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

        const data = await ticketSchema.findOne({ guildId: interaction.guild.id })
        if (!data) {
            await channelDisplay.send({embeds:[embed], components:[row]})
            await ticketSchema.create({
                guildId: interaction.guild.id,
                channelId: channelDisplay.id,
                categorySoporte: categorySupport.id,
                categoryBuy: categoryBuy.id,
                channelLogs: channelLogs.id,
                handlerRol: handlerRol.id,
                everyoneRol: everyoneRol.id,
            })

            return correReply(interaction, "Se creo correctamente el sistema de tickets", true)
        }
        if (data) {
            await channelDisplay.send({embeds:[embed], components:[row]})
            await ticketSchema.findOneAndUpdate({
                guildId: interaction.guild.id,
                channelId: channelDisplay.id,
                categorySoporte: categorySupport.id,
                categoryBuy: categoryBuy.id,
                channelLogs: channelLogs.id,
                handlerRol: handlerRol.id,
                everyoneRol: everyoneRol.id,
            })
            await data.save()
            return correReply(interaction, "SE MODIFICO CORRECTAMENTE EL SISTEMA DE TICKETS", true)
        }
    }
};

