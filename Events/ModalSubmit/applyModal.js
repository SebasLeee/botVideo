const {EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle,ChatInputCommandInteraction} = require('discord.js')
const applySchema = require('../../Models/applyGuildSchema')
const userApplySchema = require('../../Models/applyUserSchema')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
module.exports = {
    name:'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client){
        const {customId, user,member,guild} = interaction
        if(interaction.isModalSubmit() && customId === 'developerModal'){
            try {
                const applyGuild = await applySchema.findOne({applyGuildId:interaction.guild.id})
                const channelLogs = await client.channels.cache.get(applyGuild.applyChannelLogs)
                if(!channelLogs){
                    console.log('No se encontro el canal de los logs');
                }

                const userName = interaction.fields.getTextInputValue('username') || undefined
                const userAge = interaction.fields.getTextInputValue('userage') || undefined
                const userPortfolio = interaction.fields.getTextInputValue('userportfolio') || undefined
                const userDescription = interaction.fields.getTextInputValue('userdescription') || undefined

                const embedApply = new EmbedBuilder()
                .setAuthor({name:'Nueva Aplicacion para staff', iconURL: user.displayAvatarURL({dynamic:true})})
                .setDescription(`**Informacion del usuario**\n\n> Member Tag: <@${interaction.user.id}>\n> Miembro desde: <t:${parseInt(interaction.member.joinedTimestamp/1000)}:R>\n> Id del miembro: ${interaction.user.id}\n> Cuenta creada: <t:${parseInt(member.user.createdAt/1000)}:R>\n`)
                .setThumbnail(`${interaction.user.avatarURL()}`)
                .addFields(
                    {name:'Nombre del usuario', value:`\`\`\`${userName}\`\`\``, inline:true},
                    {name:'Edad del usuario', value:`\`\`\`${userAge}\`\`\``, inline:true},
                    {name:'Portafolio del usuario', value:`\`\`\`${userPortfolio}\`\`\``, inline:true},
                    {name:'Descripcion del usuario', value:`\`\`\`${userDescription}\`\`\``, inline:true},
                    {name:'Estado', value:`Pendiente`, inline:true},
                )
                .setFooter({text:`${guild.name}`, iconURL:client.user.avatarURL({dynamic:true})})
                .setTimestamp()

                // creacion de los botones de aceptar y denegar

                const buttonsActions = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setLabel('Aceptar')
                    .setCustomId('applyacept')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🏆'),
                    new ButtonBuilder()
                    .setLabel('Denegar')
                    .setCustomId('applydeny')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🗑'),
                )

                const envioDelMensaje = await channelLogs.send({embeds:[embedApply], components:[buttonsActions]})

                const newUser = await userApplySchema.create({
                    applyGuildId:interaction.guild.id,
                    applyUserId:interaction.user.id,
                    applyMessageId:envioDelMensaje.id
                })
                newUser.save()
                
                correReply(interaction,'Se envio correctamente tu aplicacion',true)
            } catch (error) {
                console.log(error);
                return errReply(interaction,'Se produjo un error al enviar tu solicitud',true)
            }
        }
    }
};
