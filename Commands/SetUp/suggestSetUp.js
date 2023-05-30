const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')
const suggestSchema = require('../../Models/suggestSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestsetup')
        .setDescription('Crea el sistema de sugerencias')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal de las sugerencias')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction
        const suggestChannel = options.getChannel('channel')
        suggestSchema.findOne({ guildSuggest: interaction.guild.id }, async (err, data) => {
            if (err) {
                return console.log(err);
            }
            if (!data) {
                await suggestSchema.create({
                    guildSuggest: interaction.guild.id,
                    guildChannel: suggestChannel.id
                })

                return interaction.reply({ content: "Se ha creado correctamente el sistema de sugerencias", ephemeral: true })
            }
            if (data) {
                return interaction.reply({ content: "Tienes una data creada", ephemeral: true })
            }
        })
    }
};
