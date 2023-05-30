const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, ChatInputCommandInteraction } = require('discord.js')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const confesionesSchema = require('../../Models/countingSchema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('counting-setup')
        .setDescription('Crea un sistema de conteo para tu servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal donde se hara el sistema de conteo')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction
        const channel = options.getChannel('channel')
        try {
            const confesionesData = await confesionesSchema.findOne({ guildId: interaction.guild.id })
            if (!confesionesData) {
                await confesionesSchema.create({
                    guildId: interaction.guild.id,
                    channelId: channel.id
                })
                return correReply(interaction, "Se creo correctamente el sistema de conteo", true)
            }
            if (confesionesData) {
                await confesionesSchema.findOneAndUpdate({
                    guildId: interaction.guild.id,
                    channelId: channel.id
                })
                return correReply(interaction, "Se modifico correctamente el sistema de confesiones", true)
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Ocurrio un error al tratar de crear el sistema de confesiones", true)
        }

    }
};
