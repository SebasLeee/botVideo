const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const suggestSchema = require('../../Models/suggestSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Crea una sugerencia'),
    async execute(interaction) {
        try {
            const suggestData = await suggestSchema.findOne({ guildSuggest: interaction.guild.id })
            if (!suggestData || !suggestData.guildChannel) return errReply(interaction, "No hay un sistema de sugerencias creado hasta el momento intentalo de nuevo mas tarde", true)
            if(suggestData.Enabled == false) return errReply(interaction,"El sistema de sugerencias esta desactivado",true)
            const suggestModal = new ModalBuilder()
                .setCustomId('suggestModal')
                .setTitle('Deja tu sugerencia')

            const suggestDesc = new TextInputBuilder()
                .setCustomId('suggestdesc')
                .setLabel('¿Cual es tu sugerencia?')
                .setStyle(TextInputStyle.Paragraph)

            const componenteModal = new ActionRowBuilder().addComponents(suggestDesc)

            suggestModal.addComponents(componenteModal)

            await interaction.showModal(suggestModal)
        } catch (error) {
            console.log(error);
        }
    }

};