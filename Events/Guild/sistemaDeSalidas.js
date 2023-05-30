const {EmbedBuilder} = require('discord.js');
const leaveSchema = require('../../Models/leaveSchema');

module.exports = {
    name:'guildMemberRemove',
    async execute(member, client){
        leaveSchema.findOne({Guild:member.guild.id}, async(err, data)=>{
            if(!data) return;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel)
            const welcomeDesc = data.MessageDes
            const welcomeImg = data.ImagenDesc
            const {guild} = member;
            const welcomeEmbed = new EmbedBuilder()
            .setTitle(`**Acaba de irse del servidor**`)
            .setAuthor({name:`${member.user.tag}`, iconURL:member.user.avatarURL({sieze:4096, dynamic:true})})
            .setDescription(`${welcomeDesc}\n\nSin ti somos ${guild.memberCount}`)
            .setThumbnail(member.user.avatarURL({dynamic:true, format:'png'}))
            .setImage(`${welcomeImg}`)
            .setFooter({text:`${guild.name}`, iconURL:client.user.avatarURL({dynamic:true})})
            .setTimestamp()

            welcomeChannel.send({embeds:[welcomeEmbed]})
        })
    }
};

