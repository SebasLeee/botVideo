const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-icon')
        .setDescription('Obtienes la imagen del servidor.'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor('#1bfcbe')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setDescription(`Se está mostrando el avatar de ${interaction.guild.name}`)
            .setImage(`${interaction.guild.iconURL({dynamic:true, size: 1024})}`)
            .setFooter({ text: `Pedido por ${interaction.member.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        return await interaction.reply({
            embeds: [embed],
        });
    },
};