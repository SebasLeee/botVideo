const { EmbedBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const suggestSchema = require('../../Models/suggestSchema')
const suggestMessageData = require('../../Models/suggestMessage')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { customId } = interaction
        if (interaction.isButton() && customId === 'votono') {
            try {
                const suggestData = await suggestSchema.findOne({ guildSuggest: interaction.guild.id })
                const suggestMessage = await suggestMessageData.findOne({ guildId: interaction.guild.id, messageId: interaction.message.id })
                if (!suggestMessage || !suggestData) return;
                if (suggestMessage.votesNo.includes(interaction.user.id)) return errReply(interaction, "Tu ya votaste anteriormente en NO, ya no puedes votar nuevamente", true)
                if (suggestMessage.votesSi.includes(interaction.user.id)) suggestMessage.votesSi.splice(suggestMessage.votesSi.indexOf(interaction.user.id), 1)

                suggestMessage.votesNo.push(interaction.user.id)
                suggestMessage.save()

                interaction.message.embeds[0].fields[1].value = `${suggestMessage.votesSi.length}`
                interaction.message.embeds[0].fields[2].value = `${suggestMessage.votesNo.length}`

                await interaction.message.edit({ embeds: [interaction.message.embeds[0]] })
                interaction.deferUpdate()
            } catch (error) {
                console.log(error);
                return;
            }
        }
    }
};
