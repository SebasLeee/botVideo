const {EmbedBuilder} = require('discord.js')
const cooldown = new Set()
const config = require('../../config.json')
module.exports = {
    name:'interactionCreate',
    async execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        const cooldowns = await command.Cooldown

        if(!command){
            return interaction.reply({content:"Comando deshabilidado"});
        }

        if(command.developer && interaction.user.id !== config.developer){
            return interaction.reply({content:"Comando solamente para developers"});
        }

        if(command.Cooldown && cooldown.has(interaction.user.id)){
            const embed = new EmbedBuilder()
            .setDescription(`Este comando tiene cooldown tienes que esperar un poco para volver a utilizar este comando | Tienes que esperar ${cooldowns / 1000} segundos`)

            return interaction.reply({embeds:[embed], ephemeral:true})
        }
        cooldown.add(interaction.user.id)
        try {
            setTimeout(()=>{
                cooldown.delete(interaction.user.id)
            }, cooldowns)
        } catch (error) {
            return;
        }



        command.execute(interaction, client)
    }
};
