const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
  } = require("discord.js");
  
  const translate = require("translate-google");
  const ISO6391 = require("iso-639-1");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("traducir")
      .setDescription("Traducir texto")
      .addStringOption((uwagi) =>
        uwagi
          .setName("text")
          .setDescription("Pon el texto que desees traducir")
          .setRequired(true)
      )
      .addStringOption((uwagi) =>
        uwagi
          .setName("language")
          .setDescription("Pon el idioma a donde quieres trasladar el texto")
          .setRequired(true)
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const text = interaction.options.getString("text");
      const language = interaction.options.getString("language");
      const { user: author } = interaction;
      translate(text, { to: language })
        .then((result) => {
          const languageName = ISO6391.getName(language) || language;
          const Embed = new EmbedBuilder()
            .setColor("Aqua")
            .setTitle(`Translated to ${languageName} language`)
            .addFields(
              {
                name: `Texto sin traducción:`,
                value: `${text}`,
              },
              {
                name: `Texto traducido:`,
                value: `${result}`,
              }
            )
            .setFooter({ text: `Solicitado por ${author.username}`, iconURL: author.displayAvatarURL(true) })
            .setTimestamp()
          interaction.reply({ embeds: [Embed] });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  };