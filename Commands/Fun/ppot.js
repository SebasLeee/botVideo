const { Client, ChatInputCommandInteraction, ComponentType, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ppt")
    .setDescription("juega una partida de piedra, papel o tijeras!"),


    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { user, guild } = interaction
        let choices = ["piedra", "papel", "tijeras"]
        const botchoice = `${choices[(Math.floor(Math.random() * choices.length))]}`

        const Embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({ name: "Pedra papel tijeras", iconURL: user.displayAvatarURL() })
            .setDescription(`<@${user.id}> vamos a la ataque !`)

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("piedra")
                .setLabel("piedra")
                .setEmoji(`✊`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("papel")
                .setLabel("papel")
                .setEmoji(`✋`),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("tijeras")
                .setLabel("tijeras")
                .setEmoji(`✌`),

        )

        const Page = await interaction.reply({

            embeds: [Embed],
            components: [row]
        })
        const col = Page.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms("10s")
        })
        col.on("collect", i => {

            switch (i.customId) {

                case "piedra": {

                    if (botchoice == "piedra") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "Piedra", inline: true },
                                        { name: "eleccion del bot", value: "Piedra", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "papel") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`has perdido la partida el bot gana\`\`\``)
                                    .addFields(
                                        { name: "My elección", value: "Piedra", inline: true },
                                        { name: "Eleccion del bot", value: "papel", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "tijeras") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "Piedra", inline: true },
                                        { name: "Eleccion del bot", value: "Tijeras", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }
                    break;
                case "papel": {
                    if (botchoice == "piedra") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida\`\`\``)
                                    .addFields(
                                        { name: "My elección", value: "papel", inline: true },
                                        { name: "Eleccion del bot", value: "Piedra", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "papel") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "papel", inline: true },
                                        { name: "Eleccion del bot", value: "papel", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "tijeras") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has perdido la partida el bot gana\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "Feuille", inline: true },
                                        { name: "Eleccion del bot", value: "Ciseaux", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }
                    break;

                case "tijeras": {

                    if (botchoice == "piedra") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has perdido la partido el bot gana\`\`\``)
                                    .addFields(
                                        { name: "My elección", value: "tijeras", inline: true },
                                        { name: "Eleccion del bot", value: "Piedra", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }

                    if (botchoice == "papel") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Has ganado la partida el bot pierde\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "Tijeras", inline: true },
                                        { name: "Eleccion del bot", value: "Papel", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                    if (botchoice == "tijeras") {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(`Blue`)
                                    .setAuthor({ name: "Piedra papel tijeras", iconURL: user.displayAvatarURL() })
                                    .setDescription(`\`\`\`Empate\`\`\``)
                                    .addFields(
                                        { name: "My eleccion", value: "Tijeras", inline: true },
                                        { name: "Eleccion del bot", value: "Tijeras", inline: true }
                                    )
                            ],
                            components: []
                        })
                    }
                }
                    break;
            }
        })
        col.on("end", (collected) => {

            if (collected.size > 0) return

            interaction.editReply({
                embeds: [
                    Embed.setDescription(`No elegiste tu ataque`)
                ],
                components: []
            })
        })
    }
}