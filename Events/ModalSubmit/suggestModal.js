const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const suggestSchema = require('../../Models/suggestSchema')
const suggestMessge = require('../../Models/suggestMessage')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        const { customId, member } = interaction
        if (interaction.isModalSubmit() && customId === 'suggestModal') {
            try {
                const data = await suggestSchema.findOne({ guildSuggest: interaction.guild.id })
                if (!data || !data.guildChannel) return;

                const suggestChannel = member.guild.channels.cache.get(data.guildChannel);
                const suggestDesc = interaction.fields.getTextInputValue('suggestdesc')
                const suggestEmbed = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({ name: `${interaction.user.username} acaba de hacer una sugerencia`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .addFields(
                        { name: 'Sugerencia', value: `\`\`\`${suggestDesc}\`\`\`` },
                        { name: 'Votos Positivos', value: `0`, inline: true },
                        { name: 'Votos Negativos', value: `0`, inline: true },
                    )
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()
                // Creacion de los botones

                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('votosi')
                        .setEmoji('✅')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId('votono')
                        .setEmoji('❌')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('votolist')
                        .setEmoji('🎃')
                        .setStyle(ButtonStyle.Secondary),
                )
                const msg = await suggestChannel.send({ embeds: [suggestEmbed], components: [buttons] })
                await suggestMessge.create({
                    guildId: interaction.guild.id,
                    messageId: msg.id,
                    authorId: interaction.user.id,
                    votesSi: [],
                    votesNo: [],
                })
                return await interaction.reply({ content: "Se ha enviado correctamente tu sugerencia", ephemeral: true })

            } catch (error) {
                console.log(error);
                return
            }
        }
    }
};
