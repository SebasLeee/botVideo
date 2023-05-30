const {SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder, ChatInputCommandInteraction, Embed} = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const ms = require('ms')

module.exports = {
    data:new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutea a un usuario de tu servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option=>
        option.setName('user')
        .setDescription('Elige al usuario para mutear')
        .setRequired(true)
    )
    .addStringOption(option=>
        option.setName('time')
        .setDescription('Ingresa el tiempo de sancion (1s,1m,1h)')
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
        const time = ms(options.getString('time'))
        const comparacion = ms('28d')
        if(time > comparacion){
            return errReply(interaction,"El tiempo de sancion máxima es de 28 dias, no puedes pasarte de ese tiempo")
        }

        //MuteEmbed

        const muteEmbed = new EmbedBuilder()
        .setTitle('Muteado correctamente')
        .setDescription(`El usuario ${user} fue muteado por <@${interaction.user.id}>\nRazón:${description}`)
        .setColor('Red')
        .setTimestamp()
        try {
            await user.timeout(time)
            await interaction.channel.send({embeds:[muteEmbed]})
            return correReply(interaction,`${user} fue muteado correctamente`,true)
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de mutear al usuario",true)
        }

    }
};
