const {SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder, ChatInputCommandInteraction, Embed} = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const ms = require('ms')

module.exports = {
    data:new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmutea a un usuario de tu servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option=>
        option.setName('user')
        .setDescription('Elige al usuario para mutear')
        .setRequired(true)
    )

    .addStringOption(option=>
        option.setName('description')
        .setDescription('Escribe la razon del muteo')
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const {options} = interaction
        const user = options.getMember('user')
        const description = options.getString('description') || 'No se especifico la razón'

        const unmuteEmbed = new EmbedBuilder()
        .setTitle('Unmuteado correctamente')
        .setDescription(`El usuario ${user} fue unmuteado por <@${interaction.user.id}>\nRazón:${description}`)
        .setColor('Green')
        .setTimestamp()
        try {
            await user.timeout(null)
            await interaction.channel.send({embeds:[unmuteEmbed]})
            return correReply(interaction,`${user} fue unmuteado correctamente`,true)
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de mutear al usuario",true)
        }

    }
};
