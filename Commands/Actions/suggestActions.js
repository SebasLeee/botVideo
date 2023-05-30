const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const suggestSchema = require('../../Models/suggestSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest-actions')
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
        try {
            const data = await suggestSchema.findOne({guildSuggest:interaction.guild.id})
            if(!data) return errReply(interaction,"Todavia no se ha creado el sistema de sugerencias",true);
            const {options} = interaction
            let action = await options.getBoolean('boolean')
            switch (action) {
                case true:
                    data.Enabled = true;
                    data.save()
                    return correReply(interaction,'Se cambio correctamente el estado de las sugerencias, ahora se reciben nuevamente sugerencias',true)
                case false:
                    data.Enabled = false;
                    data.save()
                    return correReply(interaction,'Se cambio correctamente el estado de las sugerencias, ahora no se reciben sugerencias',true)
            }

        } catch (error) {
            console.log(error);
            return errReply(interaction,'Acaba de ocurrir un error al tratar de actualizar las opciones del sistema de aplicaciones',true)
        }
    }
};

