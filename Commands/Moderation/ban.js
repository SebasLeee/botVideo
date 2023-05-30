const {SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario del servidor')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option=>
        option.setName('usuario')
        .setDescription('Elige el usuario a banear')
        .setRequired(true)
    )
    .addStringOption(option=>
        option.setName('razon')
        .setDescription('Razon del baneo')
        .setRequired(false)
    ),

    async execute(interaction){
        const {channel, options} = interaction
        const user = options.getUser('usuario')
        const razon = options.getString('razon') || 'No se especifico una razon'

        const member = await interaction.guild.members.fetch(user.id)

        const embedError = new EmbedBuilder()
        .setDescription(`No puedes banear a ${user} ya que tiene un rol mayor`)
        .setColor('Red')

        if(member.roles.highest.position >= interaction.member.roles.highest.position){
            return interaction.reply({embeds:[embedError]})
        }

        await member.ban({razon})

        const embedBan = new EmbedBuilder()
        .setTitle(`✅| Usuario baneado correctamente`)
        .setDescription(`${user} fue baneado por: ${razon}`)
        .setFields(
            {name:`Id`, value:`${user.id}`}
        )
        .setColor('Green')
        .setTimestamp()

        await interaction.reply({embeds:[embedBan]})
    }
};
