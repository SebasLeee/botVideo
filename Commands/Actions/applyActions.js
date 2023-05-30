const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const applyGuildSchema = require('../../Models/applyGuildSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply-actions')
        .setDescription('Elige las acciones de tu sistema de aplicaciones')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addBooleanOption(option =>
            option.setName('boolean')
                .setDescription('Deseas ACTIVAR o DESACTIVAR las aplicaciones')
                .setRequired(true),
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        // Creamos los nuevos botones en caso de activacion y desactivacion

        const botonEnable = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('apply')
                .setLabel('Click para empezar')
                .setStyle(ButtonStyle.Success)
                .setDisabled(false)
                .setEmoji('💻')
        )
        const botonDisable = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('applyyy')
                .setLabel('Click para empezar')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(true)
                .setEmoji('💻')
        )
        try {
            const {options,message} = interaction
            let action = await options.getBoolean('boolean')
            const applyGuildData = await applyGuildSchema.findOne({applyGuildId:interaction.guild.id})
            if(!applyGuildData){
                return errReply(interaction,'No se encontro el sistema de aplicaciones, Porfavor crea uno primero',true)
            }
            const applyChannel = await interaction.guild.channels.cache.get(applyGuildData.applyChannelDisplay)
            const messageApply = await applyChannel.messages.fetch(applyGuildData.applyMessage)

            let disableEnable = null
            switch (action) {
                case true:
                    action = false
                    disableEnable = true
                    applyGuildData.applyGuildStatus= action
                    await messageApply.edit({components:[botonEnable]})
                    await applyGuildData.save()
                    return correReply(interaction,'Se cambio correctamente el estado de la apply, ahora se reciben nuevamente aplicaciones',true)
                case false:
                    action = true
                    disableEnable = false
                    applyGuildData.applyGuildStatus=false
                    await messageApply.edit({components:[botonDisable]})
                    await applyGuildData.save()
                    return correReply(interaction,'Se cambio correctamente el estado de las aplicaciones, ahora no se reciben aplicaciones',true)
            }

        } catch (error) {
            console.log(error);
            return errReply(interaction,'Acaba de ocurrir un error al tratar de actualizar las opciones del sistema de aplicaciones',true)
        }
    }
};

