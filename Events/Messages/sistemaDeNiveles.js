const { Message } = require('discord.js')
const levelSchemaGuild = require('../../Models/levelGuildSchema')
const levelUserSchema = require('../../Models/levelUsersSchema')

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message 
     */
    async execute(message) {
        if (message.author.bot || !message.guild || !message.channel) return;

        const levelData = await levelSchemaGuild.findOne({ guildId: message.guild.id })
        if (!levelData) return;

        const channel = message.guild.channels.cache.get(levelData.channelId)
        if (!channel) return;

        const levelUser = await levelUserSchema.findOne({ guildId: message.guild.id, userId: message.author.id })
        if (!levelUser) {
            return await levelUserSchema.create({
                guildId: message.guild.id,
                userId: message.author.id,
                userXp: 0,
                userXpCheck: 100,
                userLevel: 0,
            })
        } else if (levelUser.userXp >= levelUser.userXpCheck) {
            const resetXp = levelUser.userXp = 0;
            const checkXp = levelUser.userXpCheck + 100
            const newLevel = levelUser.userLevel + 1

            await levelUserSchema.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, {
                userXp: resetXp,
                userXpCheck: checkXp,
                userLevel: newLevel,
            })

            await channel.send({ content: `${message.author} Subio al nivel ${newLevel}` })
        }

        if (message.content < 6) return;

        if (levelUser.userLevel == 5) {
            await message.member.roles.add('1104093969626976276')
        } else if (levelUser.userLevel == 10) {
            await message.member.roles.add('1102654705701761115')
        }

        const xpRandom = Math.floor(Math.random() * 30)
        const xpPoints = levelUser.userXp + xpRandom;

        await levelUserSchema.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, {
            userXp:xpPoints
        })

    }
};
