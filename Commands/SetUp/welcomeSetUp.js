const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const welcomeSchema = require('../../Models/welcomeSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcomesetup')
        .setDescription('Crea un sistema de bienvenidas al servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Solo administrador
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Elige el canal donde quieres que salga las bienvenidas')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addStringOption(option=>
            option.setName('color')
            .setDescription('Elige el color del texto')
            .addChoices(
                {name:'Rojo', value:'#FF0000'},
                {name:'Blanco', value:'#FFFFFF'},
                {name:'NEGRO', value:'#000000'},
            )
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('welcomedesc')
                .setDescription('Escribe la descripcion del mensaje')
                .setRequired(false)
        )
        .addAttachmentOption(option =>
            option.setName('welcomeimg')
                .setDescription('Inserta la imagen que desees que salga')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { options } = interaction
        const welcomeChannel = options.getChannel('channel'); // OBLIGATORIO
        const welcomeColor = options.getString('color') // OBLIGATORIO
        const welcomeMessage = options.getString('welcomedesc') || 'Pasala muy bien'; //NO ES OBLIGATORIO
        const welcomeImage = options.getAttachment('welcomeimg') || `https://media.discordapp.net/attachments/1101298484239401051/1101299630819516456/telon-fondo-textura-muro-hormigon-solido_53876-129493.png`;
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "No tengo permisos para esto", ephemeral: true })
        }

        welcomeSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) {
                console.log(err);
                return interaction.reply({ content: "Ha ocurrido un error", ephemeral: true })
            }
            if (!data) {
                await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    MessageDes: welcomeMessage,
                    ImagenDesc: welcomeImage.url,
                    Color:welcomeColor,
                })
                return interaction.reply({ content: "El sistema de bienvenidas fue creado correctamente", ephemeral: true })
            }
            if (data) {
                await welcomeSchema.findOneAndUpdate({
                    Guild: interaction.guild.id,
                    Channel: welcomeChannel.id,
                    MessageDes: welcomeMessage,
                    ImagenDesc: welcomeImage.url,
                    Color:welcomeColor,
                })
                return interaction.reply({ content: "Se modifico correctamente la data", ephemeral: true })
            }
        })
    }
};
