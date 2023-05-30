const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banana')
        .setDescription('Mira cuánto te mide.')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario')
                .setRequired(false)
        ),


    async execute(interaction) {
        const { options } = interaction;
        const usuario = interaction.options.getUser('usuario') || interaction.user
        const banana = [Math.floor(Math.random() * 22)]

        const embed = new EmbedBuilder()
            .setDescription(`**La banana de ${usuario.username} mide ${banana} cm.**`)
            .setColor("DarkButNotBlack")
            .setImage('https://media.discordapp.net/attachments/755529601333067940/853072892702490624/banana.png?width=442&height=442')


        await interaction.reply({ embeds: [embed] })
    }
}