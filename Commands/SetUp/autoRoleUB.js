const {SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction} = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const autoRole = require('../../Models/autoRoleType')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('role-setup')
    .setDescription('Crea un sistema de autoroles para usuarios y bots')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(option=>
        option.setName('userrole')
        .setDescription('Elige el rol para el usuario')
        .setRequired(true)
    )
    .addRoleOption(option=>
        option.setName('botrole')
        .setDescription('Elige el rol para el bot')
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client){
        const {options} = interaction
        const userRole = options.getRole('userrole')
        const botRole = options.getRole('botrole')
        try {
            const autoRolData = await autoRole.findOne({guildId:interaction.guild.id})
            if(!autoRolData){
                await autoRole.create({
                    guildId:interaction.guild.id,
                    userRole:userRole.id,
                    botRole:botRole.id,
                })
                return correReply(interaction,"Se creo correctamente el sistema de autoroles",true)
            }
            if(autoRolData){
                await autoRole.findOneAndUpdate({
                    guildId:interaction.guild.id,
                    userRole:userRole.id,
                    botRole:botRole.id,
                })

                autoRolData.save()
                return correReply(interaction,"Se cambio de roles correctamente",true)
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de crear el sistema de autorol",true)
        }
    }
};
