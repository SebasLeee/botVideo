const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, Client} = require('discord.js') 
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const reportSchema = require('../../Models/reportGuldSchema')
const reportUserSchema = require('../../Models/reportUserSchema')

module.exports = {
    data:new SlashCommandBuilder()
    .setName('report')
    .setDescription('Reporta a un usuario')
    .addUserOption(option=>
        option.setName('user')
        .setDescription('Elige al usuario a reportar')
        .setRequired(true)
    )
    .addStringOption(option=>
        option.setName('description')
        .setDescription('Razon del reporte')
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction,client){
        const {options, guild} = interaction
        const user = options.getUser('user')
        const buscar = guild.members.cache.find(m=>m.id === user.id)
        const description = options.getString('description')
        try {
            const guildData = await reportSchema.findOne({reportGuildId:interaction.guild.id})
            if(!guildData){
                return errReply(interaction,"Todavia no se ha creado el sistema de reportes, intentalo de nuevo mas tarde",true)
            }
            const channelLogs = client.channels.cache.get(guildData.reportChannelId)
            if(!channelLogs){
                console.log('NO se encontro el canal de los logs');
            }

            // Creacion del embed

            const embedReport = new EmbedBuilder()
            .setTitle('Nuevo Reporte')
            .setDescription(`**Informacion del Usuario Reportado**\n\n> Member Tag: <@${user.id}>\n> Miembro desde: <t:${Math.floor(buscar.joinedTimestamp/1000)}:R>\n> Id del usuario:${user.id}\n> Cuenta Creada: <t:${Math.floor(user.createdTimestamp/1000)}:R>\n\n\n**Informacion del reportante**\n\n> Member Tag: <@${interaction.user.id}>\n> Miembro desde: <t:${parseInt(interaction.member.joinedTimestamp/1000)}:R>\n> Id del miemrbo: ${interaction.user.id}\n> Cuenta creada: <t:${parseInt(interaction.user.createdTimestamp/1000)}:R>\n`)
            .setColor('Gold')
            .setThumbnail(user.avatarURL({dynamic:true}) ?? 'https://cdn.discordapp.com/embed/avatars/0.png')
            .setFields(
                {name:'Razon', value:`\`\`\`${description}\`\`\``, inline:true},
                {name:'Enviado al MD', value:`\`\`\`Esperando Sancion...\`\`\``, inline:true},
                {name:'Usuario Sancionado', value:`\`\`\`Esperando Sancion...\`\`\``, inline:true},
            )
            .setTimestamp()

            // Creacion de los botones

            const buttonsActions = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId('reportkick')
                .setStyle(ButtonStyle.Success)
                .setLabel('Kickear')
                .setEmoji('🥾'),
                new ButtonBuilder()
                .setCustomId('reportto')
                .setStyle(ButtonStyle.Secondary)
                .setLabel('TimeOut 15m')
                .setEmoji('🎪'),
                new ButtonBuilder()
                .setCustomId('reportban')
                .setStyle(ButtonStyle.Danger)
                .setLabel('Banear')
                .setEmoji('🏒'),
            )

            const messageId = await channelLogs.send({embeds:[embedReport], components:[buttonsActions]})
            const userReportado = await reportUserSchema.create({
                reportGuildId:interaction.guild.id,
                reportUserId:user.id,
                reportMessageId:messageId.id
            })
            userReportado.save()
            return correReply(interaction,"Se reporto correctamente al usuario",true)
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de reportar al usuario",true)
        }

    }
};
