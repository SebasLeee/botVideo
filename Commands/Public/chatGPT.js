const {SlashCommandBuilder,EmbedBuilder,ChatInputCommandInteraction} = require('discord.js')
const {Configuration, OpenAIApi} = require('openai')

const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')

const config = require('../../config.json')

const configuracion = new Configuration({
    apiKey:config.openAiToken
})

const openai = new OpenAIApi(configuracion)


module.exports = {
    data: new SlashCommandBuilder()
    .setName('chat-gpt')
    .setDescription('Puedes preguntar algo a chat GPT')
    .addStringOption(option=>
        option.setName('pregunta')
        .setDescription('Escribe la pregunta que deses que te responda la IA')
        .setMaxLength(300)
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction){
        const {options} = interaction
        const pregunta = options.getString('pregunta')
        try {
            const res = await openai.createCompletion({
                model:'text-davinci-003',
                prompt: pregunta,
                max_tokens: 2048,
                temperature:0.5,
            })

            const embed = new EmbedBuilder()
            .setTitle('PREGUNTA A CHAT GPT')
            .setAuthor({name:`${interaction.user.tag} Acaba de hacer una pregunta a CHAT-GPT`, iconURL: interaction.user.avatarURL({dynamic:true})})
            .setColor('Random')
            .setDescription(`Pregunta: \`\`\`${pregunta}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\` `)

            return await interaction.reply({embeds:[embed]})
        } catch (error) {
            console.log(error);
            return errReply(interaction,"Se produjo un error al tratar de realizar este comando",true)
        }
    }
    
};
