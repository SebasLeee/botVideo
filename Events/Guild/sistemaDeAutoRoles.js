const autoRoleSystem = require('../../Models/autoRoleType')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const { guild } = member;
        // SISTEMA DE AUTOROLES BOT Y USUARIO

        const autoRoleData = await autoRoleSystem.findOne({guildId:member.guild.id})
        if(!autoRoleData) return;
        if(autoRoleData){
            try {
                const userRole = await guild.roles.cache.find(r=> r.id === autoRoleData.userRole)
                const botRole = await guild.roles.cache.find(r=> r.id === autoRoleData.botRole)
                if(!userRole && !botRole){
                    console.log('No se encuentra el rol del usuario o el rol del bot');
                }
                if(member.user.bot){
                    await member.roles.add(botRole)
                }
                if(!member.user.bot){
                    await member.roles.add(userRole)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
};

