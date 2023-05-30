

const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gay')
        .setDescription('ve un percentaje de cuando eres de gay')
        .addUserOption((option) =>
            option.setName(`usuario`)
                .setDescription(`ve a un usuario cuanto es de gay`)
                .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction) {
        const usuario = interaction.options.getUser(`usuario`) || interaction.user

        let rpts = [`5%`, `10%`, `15%`, `20%`, `25%`, `30%`, `35%`, `40%`, `45%`, `50%`, `55%`, `60%`, `65%`, `70%`, `75%`, `80%`, `85%`, `90%`, `95%`, `100%`]

        ///   if (!pregunta) return int.reply('Escriba una pregunta.')
        const embed = new EmbedBuilder()
            .setColor(`#2b2d31`)
            .setTitle(`Cuanto eres de gey `)
            .setDescription(`
     usuario: 
     ${usuario.username}
      Te ha tocado:
        ${rpts[Math.floor(Math.random() * rpts.length)]} gey 🏳‍🌈
        `)
            .setFooter({ text: `Usuario quien puso el comando ${interaction.user.username}` })


        interaction.channel.send({ embeds: [embed] });
        interaction.reply({ content: `revisa tu porcentaje de gay`, ephemeral: true })

    },

};