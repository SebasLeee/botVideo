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
        if (interaction.isButton() && customId === 'votolist') {
            try {
                const suggestData = await suggestSchema.findOne({ guildSuggest: interaction.guild.id })
                const suggestMessage = await suggestMessageData.findOne({ guildId: interaction.guild.id, messageId: interaction.message.id })
                if (!suggestMessage || !suggestData) return;
                const embedList = new EmbedBuilder()
                .setTitle('Votos de la sugerencia')
                .addFields(
                    {name:'✅ Votos Positivos: ', value:`${suggestMessage.votesSi.length >=1 ? suggestMessage.votesSi.map(user => `<@${user}>`): "No hay votos"}`, inline:true},
                    {name:'❌ Votos Negativos: ', value:`${suggestMessage.votesNo.length >=1 ? suggestMessage.votesNo.map(user => `<@${user}>`): "No hay votos"}`, inline:true},
                )
                return interaction.reply({embeds:[embedList], ephemeral:true})
            } catch (error) {
                console.log(error);
                return;
            }
        }
    }
};
