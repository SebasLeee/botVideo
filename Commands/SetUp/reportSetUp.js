const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits} = require('discord.js') 
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const reportSchema = require('../../Models/reportGuldSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('report-setup')
    .setDescription('Crea el sistema de reportes para tu servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option=>
        option.setName('channel')
        .setDescription('Elige el canal para los logs')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const {options} = interaction
        const channelLogs = options.getChannel('channel')
        try {
            const reportData = await reportSchema.findOne({reportGuildId:interaction.guild.id})
            if(!reportData){
                await reportSchema.create({
                    reportChannelId:channelLogs.id,
                    reportGuildId:interaction.guild.id
                })
                return correReply(interaction,"Se creo correctamente el sistema de reportes para tu servidor", true)
            }
            if(reportData){
                return errReply(interaction,"Ya tienes un sistema de reportes creado en tu servidor",true)
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de crear el sistema de aplicaciones",true)
        }
    }
};
