const { EmbedBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const reportSchema = require('../../Models/reportGuldSchema')
const reportUserSchema = require('../../Models/reportUserSchema')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { customId, user, guild, message } = interaction
        if (interaction.isButton() && customId === 'reportkick') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
                return errReply(interaction, "Tu no tienes permisos para hacer esto",true)
            }
            try {
                const userData = await reportUserSchema.findOne({ reportGuildId: interaction.guild.id, reportMessageId: message.id })
                const user = guild.members.cache.find(m => m.id === userData.reportUserId)
                if (!user) {
                    return errReply(interaction, "No se pudo encontrar al usuario", true)
                }
                const embed = message.embeds[0]
                const embedKick = new EmbedBuilder()
                    .setAuthor({ name: `${user.user.tag}`, iconURL: user.avatarURL({ dynamic: true }) ?? 'https://cdn.discordapp.com/embed/avatars/0.png' })
                    .setTitle(`Fuiste kikeado de ${interaction.guild.name}`)
                    .setColor('Red')
                    .setDescription(`Puedes volver a entrar al servidor con una nueva invitacion, tomate como una advertencia\n Porfavor no seas toxico o no **rompas las reglas del servidor**`)
                    .setTimestamp()

                try {
                    await user.send({ embeds: [embedKick] })
                    embed.data.fields[1] = {
                        name: 'Enviado al MD',
                        value: '✔️',
                        inline: true
                    }
                } catch (error) {
                    embed.data.fields[1] = {
                        name: 'Enviado al MD',
                        value: '❌',
                        inline: true
                    }
                }
                embed.data.fields[2] = {
                    name: 'Usuario Sancionado',
                    value: '✔️',
                    inline: true
                }

                const editEmbed = EmbedBuilder.from(embed).setColor('Red')
                await user.kick()
                await message.edit({ embeds: [editEmbed], components: [] })
                return correReply(interaction, "Se sanciono correctamente al usuario (Kickeado)", true)
            } catch (error) {
                console.log(error);
                return errReply(interaction, "Se produjo un error al tratar de sancionar al usuario", true)
            }
        }
    }
};
