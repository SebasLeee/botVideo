const countingSchema = require('../../Models/countingSchema');

const { EmbedBuilder, Message } = require('discord.js')

module.exports = {
    name: 'messageCreate',
    /**
     * 
     * @param {Message} message
     */
    async execute(message) {
        if (message.author.bot || !message.guild || !message.channel) return;

        const countingData = await countingSchema.findOne({ guildId: message.guild.id })
        if (!countingData || !countingData.channelId) return;

        if (message.channel.id === countingData.channelId) {
            const list = [
                `Arruinaste el conteo, estabamos en el numero ${countingData.count}, El nuevo numero es 1`,
                `Alguien envio un mensaje que no era y lo arruino todo ${countingData.count}, El nuevo numero es 1`
            ]

            if (message.author.id === countingData.lastPerson || message.content < countingData.count || message.content > countingData.count || isNaN(message.content)) {
                const random = list[Math.floor(Math.random() * list.length)];

                countingData.count = 1;
                countingData.lastPerson = ""
                await countingData.save()

                await message.channel.send({ embeds: [new EmbedBuilder().setTitle('Se reinicio el sistema de conteo').setDescription(`${message.author} ${random}`)] })

                return message.react('❌')
            }

        }
        if (message.content == 100 && countingData.count == 100) {
            message.react('💯')
        } else {
            message.react('✅')
        }

        countingData.count++
        countingData.lastPerson = message.author.id
        await countingData.save()
    }
};
