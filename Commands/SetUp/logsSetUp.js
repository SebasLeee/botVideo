const {SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, ChannelType} = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const logsSchema = require('../../Models/logsSchema')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('logs')
    .setDescription('Crea un sistema')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option=>
        option.setName('channel')
        .setDescription('Elige el canal de logs logs')
        .addChannelTypes(ChannelType.GuildText)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client){
        const {options} = interaction
        const channel = options.getChannel('channel')
        try {
            const logData = await logsSchema.findOne({Guild:interaction.guild.id})
            if(!logData){
                await logsSchema.create({
                    Guild:interaction.guild.id,
                    Channel:channel.id
                })
                return correReply(interaction,"Se creo correctamente el sistema de logs",true)
            }
            if(logData){
                await logsSchema.findOneAndUpdate({
                    Guild:interaction.guild.id,
                    Channel:channel.id
                })
                return correReply(interaction,"Se modifico la data anterior correctamente")
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de realizar el sistema de logs",true)
        }
    }
};
