const {EmbedBuilder} = require('discord.js')

function botPermsReply(message,razon){
    message.reply({
        embeds:[
            new EmbedBuilder()
            .setTitle('<:a_:1093633658801373346> Error')
            .addFields(
                {name:'Necesito los siguientes permisos', value:`\`\`\`prolog\n${razon}\`\`\``}
            )
            .setColor('Red')
        ]
    })
}

module.exports = botPermsReply