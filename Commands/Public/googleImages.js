const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder, ChatInputCommandInteraction, Client } = require('discord.js');
const axios = require('axios');

const apiKey = ''; // API DE GOOGLE
const cseId = ''; // API DE GOOGLE

let currentIndex = 0; // Variable para almacenar el índice actual de la imagen

module.exports = {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Hola')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Escribe la imagen a buscar')
        .setRequired(true)
    ),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {
    try {
      const query = interaction.options.getString('query');
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${encodeURIComponent(apiKey)}&cx=${encodeURIComponent(cseId)}&searchType=image&q=${encodeURIComponent(query)}`
      );

      const images = response.data.items;

      let currentImage = images[currentIndex]; // Obtener la imagen actual según el índice

      const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Ver imagen')
        .setURL(currentImage.link);

      const nextButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel('Siguiente')
        .setCustomId('next');

      const row = new ActionRowBuilder().addComponents(button, nextButton);
      const embed = new EmbedBuilder()
        .setTitle(`Buscando imágenes de ${query}`)
        .setImage(currentImage.link);

      const messageMostrar = await interaction.reply({
        content: 'Haz clic en el botón para ver la imagen:',
        embeds: [embed],
        components: [row],
      });

      const collector = messageMostrar.createMessageComponentCollector({ filter: i => i.isButton() && i.user && i.user.id === interaction.user.id, time: 180e3 });

      collector.on('collect', async (interaccion) => {
        if (interaccion.isButton()) {
          switch (interaccion.customId) {
            case 'next':
              currentIndex++;
              if (currentIndex >= images.length) {
                currentIndex = 0;
              }
              currentImage = images[currentIndex];

              const updatedButton = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel('Ver imagen')
                .setURL(currentImage.link);

              const updatedEmbed = new EmbedBuilder()
                .setTitle(`Buscando imágenes de ${query}`)
                .setImage(currentImage.link);

              await interaccion.update({
                embeds: [updatedEmbed],
                components: [row.setComponents(updatedButton, nextButton)],
              });
              break;
          }
        }
      });
      collector.on("end", () => {
        messageMostrar.edit({ content: `Tu tiempo ha expirado! Vuelve a escribir \`/google\` para verlo de nuevo!`, components: [] }).catch(() => { });
    })
    } catch (error) {
      console.error('Error:', error.message);
      interaction.reply('Ha ocurrido un error al obtener las imágenes.');
    }
  },
};
