const { PermissionFlagsBits } = require('discord.js')
const errorReply = require('../Functions/errorReply')
const userPermsReply = require('../Functions/userPermsReply')
const botPermsReply = require('../Functions/botPermsReply')

module.exports = {
    name: 'unban',
    aliases: ["pardon"],
    async execute(client, message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return userPermsReply(message, 'BanMembers')
        }
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) {
            return botPermsReply(message, 'Adminitrator')
        }
        try {
            const userId = args[0]
            if (!userId) {
                return errorReply(message, 'Necesitas ingresar el ID del usuario a unbanear')
            }
            const usuarioBaneado = await message.guild.bans.fetch()
            const user = usuarioBaneado.find(user => user.user.id === userId)
            if(!user){
                return errorReply(message,'La ID del usuario que ingresaste no esta baneado')
            }
            await message.guild.members.unban(user.user)
            await message.reply({content:`El usuario ${user.user.tag} ha sido desbaneado correctamente`})
        } catch (error) {
            console.log(error);
            return errorReply(message, 'Ocurrio un error al banear al usuario')
        }

    }
};