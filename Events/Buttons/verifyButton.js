const { } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const verifySchema = require('../../Models/verificationSchema')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton() && interaction.customId === 'verifybutton') {
            const verifyData = await verifySchema.findOne({ guildId: interaction.guild.id })
            if (!verifyData) return errReply(interaction, "No se ha encontrado la data", true)

            const role = interaction.guild.roles.cache.get(verifyData.roleId)

            await interaction.member.roles.add(role)

            return correReply(interaction, "Se otorgo correctamente el rol", true)
        }
    }
};
