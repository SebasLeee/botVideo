const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const leaveSchema = require('../../Models/leaveSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leavesetup')
        .setDescription('Crea un sistema de salidas del servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Solo administrador
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal donde quieres que salga las salidas')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('welcomedesc')
                .setDescription('Escribe la descripcion del mensaje')
                .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('welcomeimg')
                .setDescription('Inserta la imagen que desees que salga')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options } = interaction
        const leaveChannel = options.getChannel('channel');
        const leaveMessage = options.getString('welcomedesc') || ' ';
        const leaveImg = options.getString('welcomeimg') || `${interaction.user.avatarURL()}`;
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "No tengo permisos para esto", ephemeral: true })
        }
        
        leaveSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) {
                console.log(err);
                return interaction.reply({ content: "Ha ocurrido un error", ephemeral: true })
            }
            if (!data) {
                await leaveSchema.create({
                    Guild: interaction.guild.id,
                    Channel: leaveChannel.id,
                    MessageDes: leaveMessage,
                    ImagenDesc: leaveImg
                })
                return interaction.reply({ content: "El sistema de salidas fue creado correctamente", ephemeral: true })
            }
            if (data) {
                return interaction.reply({ content: "Tienes una data creada", ephemeral: true })
            }
        })
    }
};
