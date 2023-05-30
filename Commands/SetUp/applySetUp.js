const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const applyGuildSchema = require('../../Models/applyGuildSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('applysetup')
        .setDescription('Crea un sistema de aplicaciones para tu servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('applychannel')
                .setDescription('Elige el canal donde quieres se muestre')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('applylogs')
                .setDescription('Elige el canal donde quieres se muestre los logs')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addRoleOption(option =>
            option.setName('applyrol')
                .setDescription('Elige el rol a dar cuando se acepte la apply')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('applydescription')
                .setDescription('Escribe la descripcion de el setup')
                .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const applyChannel = options.getChannel('applychannel')
        const applyChannelLogs = options.getChannel('applylogs')
        const applyRole = options.getRole('applyrol')
        const applyDescription = options.getString('applydescription') || 'Aplicacion para este servidor'
        try {
            applyGuildData = await applyGuildSchema.findOne({ applyGuildId: interaction.guild.id })
            if (applyGuildData) {
                return errReply(interaction, 'Tienes un sistema de aplicaciones creado', true)
            }
            const embedApply = new EmbedBuilder()
                .setTitle('¿Quieres aplicar a staff?')
                .setDescription(`${applyDescription}`)
                .setColor('Gold')

            // Creacion de los botones

            const botonesApply = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('apply')
                    .setLabel('Click para empezar')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('💻')
            )

            // Envio del mensaje

            const messageId = await applyChannel.send({ embeds: [embedApply], components: [botonesApply] })

            // Guardamos en la base de datos la siguiente informacion proporcionada

            await applyGuildSchema.create({
                applyGuildId: interaction.guild.id,
                applyChannelLogs: applyChannelLogs.id,
                applyChannelDisplay: applyChannel.id,
                applyDescription: applyDescription,
                applyRole: applyRole.id,
                applyMessage: messageId.id,
                applyGuildStatus:true,
            })

            return correReply(interaction,'Se creo correctamente el sistema de aplicaciones',true)
        } catch (error) {
            console.log(error);
            errReply(interaction, 'Se produjo un error al tratar de crear el sistema de aplicaciones', true)
        }
    }
};
