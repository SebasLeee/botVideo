const {PermissionFlagsBits} = require('discord.js')
const errorReply =  require('../Functions/errorReply')
const userPermsReply =  require('../Functions/userPermsReply')
const botPermsReply =  require('../Functions/botPermsReply')

const ms = require('ms')
module.exports = {
    Cooldown: ms("20s"),
    name:'ban',
    aliases:["banear"],
    async execute(client,message,args){
        if(!message.member.permissions.has(PermissionFlagsBits.BanMembers)){
            return userPermsReply(message,'BanMembers')
        }
        if(!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)){
            return botPermsReply(message,'Adminitrator')
        }
        try {
            const usuario = message.mentions.members.first()
            if(!usuario){
                return errorReply(message, 'Tienes que especificar el usuario')
            }
            if(message.member.roles.highest.position>= usuario.roles.highest.position){
                return errorReply(message,'El usuario que intentaste banear tiene el mismo rol tuyo o un superior')
            }
            let razon = args.slice(1).join(" ")
            if(!razon){
                razon='No se especifico una razon del baneo'
            }
            await usuario.ban({reason:razon})
            await message.reply({content:`Se baneo a ${usuario} correctamente`})
        } catch (error) {
            console.log(error);
            return errorReply(message,'Ocurrio un error al banear al usuario')
        }
    }
};
