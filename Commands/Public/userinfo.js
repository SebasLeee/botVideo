const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')   
        .setDescription(`Find information about a user in the guild`)
        .setDMPermission(false)
        .addUserOption(option => option 
            .setName('user')
            .setDescription(`The user you want to get information about`)
            .setRequired(false)
        ),
    async execute(interaction) {
        try {

            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);
            const userAvatar = user.displayAvatarURL({ size: 32 });
            const badges = user.flags.toArray().join(', ');
            const botStatus = user.bot ? 'Yes' : 'No';
            
            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Information`) 
                .setColor('Red')
                .setThumbnail(userAvatar)
                .addFields({
                    name: `<:1831squareannounce:1101863146962046996> Joined Discord`,
                    value: `<t:${parseInt(user.createdAt / 1000)}:R>`,
                    inline: true
                })
                .addFields({
                    name: `<:3384giveslove:1101642263685238855> Joined Server`,
                    value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
                    inline: true
                })
                .addFields({
                    name: `<:1488rocketicon:1101863143749210123> Boosted Server`,
                    value: member.premiumSince ? 'Yes' : 'No',
                    inline: false
                })
                .addFields({ 
                    name: '<:3928applicationbotdark:1088940805911236708> BOT',
                    value: botStatus,
                    inline: false
                })
                .addFields({ 
                    name: '<:3446blurplecertifiedmoderator:1088942181584216136> Badges',
                    value: badges || 'None',
                    inline: false
                })
                .setTimestamp()
                .setFooter({ text: `User ID: ${user.id}`})

            await interaction.reply({ embeds: [embed], ephemeral: true });
            
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `An error occurred while executing the command.`, ephemeral: true});
        }
    }
}
