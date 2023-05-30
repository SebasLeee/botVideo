const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const confesionesSchema = require('../../Models/confesionesSetUp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confesiones')
        .setDescription('Di una confesion.')
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Que confesion deseas realizar')
                .setMaxLength(2048)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('elegir')
                .setDescription('Deseas que sea publico o no')
                .addChoices(
                    { name: 'Publico', value: 'p' },
                    { name: 'Privado', value: 'c' },
                )
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options } = interaction
        const desc = options.getString('description')
        const elegir = options.getString('elegir')
        try {
            const confesionesData = await confesionesSchema.findOne({ guildId: interaction.guild.id })
            if (!confesionesData) {
                return correReply(interaction, "No se ha creado todavia el sistema de confesiones", true)
            }
            const channel = client.channels.cache.get(confesionesData.channelId)
            if (!channel) return errReply(interaction, "No se encontro el canal", true)
            switch (elegir) {
                case 'p':
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${interaction.user.tag} acaba de realizar una confesion` })
                        .setDescription(`**La confesion es:**\n> \`\`\`${desc}\`\`\``)
                        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                        .setColor('Random')
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

                    await channel.send({ embeds: [embed] })
                    return correReply(interaction, "Se envio correctamente tu confesion publica", true)

                case 'c':
                    const embedd = new EmbedBuilder()
                        .setAuthor({ name: `Acaban de realizar una confesion privada 😏` })
                        .setDescription(`**La confesion es:**\n> \`\`\`${desc}\`\`\``)
                        .setThumbnail("https://www.shutterstock.com/image-photo/unknown-woman-holding-question-mark-260nw-1718774170.jpg")
                        .setColor('Random')
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })

                    await channel.send({ embeds: [embedd] })
                    return correReply(interaction, "Se envio correctamente tu confesion privada", true)
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Ocurrio un error al tratar de crear el sistema de confesiones", true)
        }

    }
};
