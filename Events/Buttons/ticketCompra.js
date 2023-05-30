const { EmbedBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } = require('discord.js')

const {createTranscript} = require('discord-html-transcripts')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const ticketSchema = require('../../Models/ticketGuildSchema')
const ticketSoporte = require('../../Models/ticketBuySchema')

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { customId } = interaction
        if (interaction.isButton() && customId === 'closecompras') {
            try {
                const ticketData = await ticketSchema.findOne({ guildId:interaction.guild.id})
                if(!ticketData) return errReply(interaction,"No se ha creado el sistema de tickets",true)
                if(!interaction.member.roles.cache.get(ticketData.handlerRol)) return errReply(interaction,"No tienes permisos para hacer esto",true)
                const data = await ticketSoporte.findOne({guildId:interaction.guild.id, channelId:interaction.channel.id})
                if(!data) return errReply(interaction,"Este canal fue eliminado de la base de datos, puede eliminar el canal",false)
                const channelLogs = interaction.member.guild.channels.cache.get(ticketData.channelLogs);
                if(!channelLogs) return errReply(interaction,"No se encontro el canal de los logs",true)

                const transcript = await createTranscript(interaction.channel, {
                    limit:-1,
                    filename:`${interaction.user.username}.html`
                }) 

                const embed = new EmbedBuilder()
                .setDescription('Se cerro el ticket')

                await channelLogs.send({embeds:[embed], files:[transcript]})
                await ticketSoporte.findOneAndDelete({guildId:interaction.guild.id, channelId:interaction.channel.id})
                await interaction.channel.delete()

            } catch (error) {
                console.log(error);
                return;
            }
        }
    }
};
