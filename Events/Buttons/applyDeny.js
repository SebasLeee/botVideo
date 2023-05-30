const {EmbedBuilder,ChatInputCommandInteraction,} = require('discord.js')
const config = require('../../config.json')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const applyGuildSchema = require('../../Models/applyGuildSchema')
const applyUserSchema = require('../../Models/applyUserSchema')

module.exports = {
    name:'interactionCreate',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction,client){
        const {customId, user, guild, message} = interaction
        if(interaction.isButton() && customId==='applydeny'){
            try {
                if(interaction.user.id !== config.developer){
                    return errReply(interaction,'Tu no puedes denegar aplicaciones o no cuentas con los permisos necesarios',true)
                }
                const embed = message.embeds[0]
                const userData = await applyUserSchema.findOne({applyGuildId:guild.id,applyMessageId:message.id})
                const user = await client.users.cache.get(userData.applyUserId)
                embed.data.fields[4] = {
                    name:'Status',
                    value:'Denegado',
                    inline:true
                }
                const embedDenegado = EmbedBuilder.from(embed).setAuthor({name:'Aplicacion Denegada', iconURL:user.displayAvatarURL({dynamic:true})}).setColor('Red').addFields({name:`Denegado por`, value:`<@${interaction.user.id}>`})
                message.edit({embeds:[embedDenegado], components:[]})
                const embedUser = new EmbedBuilder()
                .setTitle('Aplicacion Denegada')
                .setDescription('Tu aplicacion para staff fue denegada')
                .setColor('Red')

                await user.send({embeds:[embedUser]})
                await applyUserSchema.findOneAndDelete({applyGuildId:guild.id,applyMessageId:message.id})
                correReply(interaction, 'La aplicacion fue denegada correctamente', true)
            } catch (error) {
                console.log(error);
                return errReply(interaction,'Se produjo un error al tratar de denegar la aplicacion del usuario',true)
            }
        }
    }
};
