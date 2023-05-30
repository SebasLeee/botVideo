const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')

const ms = require('ms')
module.exports = {
    Cooldown: ms("10s"),
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Te doy una respuesta tu pregunta')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('¿Que pregunta deseas hacer?')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction
        const pregunta = options.getString('question')
        const respuestas = [
            "Sí",
            "No",
            "Tal vez",
            "No estoy seguro",
            "Es posible",
            "Probablemente no",
            "Absolutamente",
            "Definitivamente no",
            "Espera y verás",
            "No cuentes con ello",
            "Muy probable",
            "Poco probable",
            "No tengo idea",
            "Sí, definitivamente",
            "No, de ninguna manera",
            "Es complicado",
            "Podría ser",
            "No lo sé",
            "No estoy convencido",
            "Por supuesto",
            "Por ningún motivo",
            "Sin duda",
            "Ni en un millón de años",
            "Claro que sí",
            "No puedo predecir eso",
            "Lo dudo mucho",
            "Espero que sí",
            "Mejor pregúntame más tarde",
            "Mejor no te digo",
            "No me hagas decidir",
            "Estoy indeciso"
        ];
        try {
            const indice = Math.floor(Math.random() * respuestas.length)
            const ballEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username} Acaba de hacer una pregunta`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .addFields(
                    {name:'Pregunta', value:`\`\`\`${pregunta}\`\`\``},
                    {name:'Respuesta', value:`\`\`\`${respuestas[indice]}\`\`\``},
                )
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp()
            return interaction.reply({embeds:[ballEmbed]})
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Se produjo un error al tratar de ejecutar el comando", true)
        }
    }
};
