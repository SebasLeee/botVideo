const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Te cuenta una historia graciosa'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        try {
            const jokeResponses = [  "¿Por qué la gallina cruzó la carretera? Para llegar al otro lado.",  "¿Por qué los pingüinos no pueden volar? Porque no tienen suficiente dinero para comprar un boleto de avión.",  "¿Por qué los gatos odian el agua? Porque no pueden atrapar peces mientras están mojados.",  "¿Por qué los programadores prefieren el café frío? Porque no les gusta el Java caliente.",  "¿Por qué los músicos tienen problemas para abrir su coche? Porque siempre pierden las llaves del 'do-re-mi'.",  "¿Por qué los leones siempre pierden en el póquer? Porque siempre les sacan las garras.",  "¿Por qué los astronautas son tan buenos contando chistes? Porque tienen un gran sentido del humor universal.",  "¿Por qué los perros no pueden bailar? Porque tienen dos patas izquierdas.",  "¿Por qué el mar es azul? Porque los peces no saben cantar.",  "¿Por qué las abejas hacen zumbido? Porque no saben cantar.",  "¿Por qué las ardillas son tan buenas para guardar nueces? Porque tienen bóvedas de seguridad en sus árboles.",  "¿Por qué los científicos nunca se aburren? Porque siempre tienen soluciones.",  "¿Por qué los elefantes nunca olvidan? Porque tienen buena memoria.",  "¿Por qué los fontaneros siempre están en forma? Porque siempre están en el trabajo de tuberías.",  "¿Por qué los koalas son tan buenos escalando árboles? Porque tienen garras afiladas.",  "¿Por qué los actores son tan buenos en juegos de palabras? Porque siempre están en busca de su línea.",  "¿Por qué los caracoles siempre ganan en carreras? Porque llevan su propia casa en la espalda.",  "¿Por qué los gusanos son tan buenos en ajedrez? Porque saben cómo moverse en el tablero.",  "¿Por qué los magos siempre son tan buenos en adivinar cosas? Porque tienen una bola de cristal.",  "¿Por qué los peluqueros son tan buenos en juegos de palabras? Porque siempre están en busca de un buen corte.",  "¿Por qué los tomates se sonrojan? Porque ven la ensalada desnuda.",];
            const indice = Math.floor(Math.random() * jokeResponses.length)
            const jokeEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.username} Acaba de usar el JOKE!`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setDescription(`\`\`\`${jokeResponses[indice]}\`\`\``)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                .setTimestamp()
            return interaction.reply({embeds:[jokeEmbed]})
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Se produjo un error al tratar de ejecutar el comando", true)
        }
    }
};
