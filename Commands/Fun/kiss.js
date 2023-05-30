const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')
const kissData = require('../../Models/kissSchema')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Besa un usuario del servidor')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Elige al usuario')
                .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction
        const user = options.getMember('user')
        if (interaction.user.id === user.id) {
            return errReply(interaction, "No puedes besarte a ti mismo", true)
        }
        let links = ["https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif", "https://media.giphy.com/media/MQVpBqASxSlFu/giphy.gif", "https://media.giphy.com/media/WynnqxhdFEPYY/giphy.gif", "https://media.giphy.com/media/11rWoZNpAKw8w/giphy.gif", "https://media.giphy.com/media/wOtkVwroA6yzK/giphy.gif"]
        let index = Math.floor(Math.random() * links.length)
        try {
            const userData = await kissData.findOne({ guildId: interaction.guild.id, userId: user.id })
            if (!userData) {
                await kissData.create({
                    guildId: interaction.guild.id,
                    userId: user.id,
                    kissCount: 1
                })
                const kissEmbed = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setTitle('Nuevo beso')
                    .setDescription(`<@${interaction.user.id}> acaba de besar a <@${user.id}>\n\n> <@${user.id}> tiene 1 beso en total`)
                    .setImage(`${links[index]}`)
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()
                return interaction.reply({ content: `Te dieron un beso <@${user.id}>`, embeds: [kissEmbed] })
            }
            if (userData) {
                userData.kissCount++
                const kissEmbed = new EmbedBuilder()
                    .setColor('Random')
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setTitle('Nuevo beso')
                    .setDescription(`<@${interaction.user.id}> acaba de besar a <@${user.id}>\n\n> <@${user.id}> tiene ${userData.kissCount} besos en total`)
                    .setImage(`${links[index]}`)
                    .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true }) })
                    .setTimestamp()

                userData.save()
                return interaction.reply({ content: `Te dieron un beso <@${user.id}>`, embeds: [kissEmbed] })
            }
        } catch (error) {
            console.log(error);
            return errReply(interaction, "Se produjo un error al tratar de besar", true)
        }
    }
};
