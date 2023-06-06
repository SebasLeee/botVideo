const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const autoRole = require('../../Models/verificationSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify-setup')
        .setDescription('Crea un sistema de verificacion para tu servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Elige el rol para el usuario')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Mensaje del embed')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal')
                .addChannelTypes(ChannelType.GuildText)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('verifybutton')
            .setEmoji('🛵')
            .setStyle(ButtonStyle.Primary)
        )

        
        const { options } = interaction
        const rol = options.getRole('role')
        const description = options.getString('description')
        const channel = options.getChannel('channel')

        const embed = new EmbedBuilder()
        .setTitle('Verificate')
        .setDescription(`${description}`)
        .setColor('DarkButNotBlack')
        try {
            const autoRolData = await autoRole.findOne({ guildId: interaction.guild.id })
            if (!autoRolData) {
                await channel.send({embeds:[embed], components:[button]})
                await autoRole.create({
                    guildId: interaction.guild.id,
                    channelId: channel.id,
                    roleId: rol.id,
                })
                return correReply(interaction, "Se creo correctamente el sistema de autoroles", true)
            }
            if (autoRolData) {
                await channel.send({embeds:[embed], components:[button]})
                await autoRole.findOneAndUpdate({
                    guildId: interaction.guild.id,
                    channelId: channel.id,
                    roleId: rol.id,
                })
                autoRolData.save()
                return correReply(interaction, "Se cambio de roles correctamente", true)
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Se produjo un error al tratar de crear el sistema de autorol", true)
        }
    }
};
