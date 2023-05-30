const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this 

//workaround to import node-fetch



module.exports = {

    data: new SlashCommandBuilder()

        .setName("shitpost")

        .setDescription("ShitPost en español."),



    async execute(interaction) {

        const { guild, options, member } = interaction;



        const platform = options.getString("platform");


        const embed = new EmbedBuilder();



        async function meme() {

            await fetch('https://www.reddit.com/r/ShitpostESP/random/.json').then(async res => {

                let meme = await res.json();



                let url = meme[0].data.children[0].data.url;



                return interaction.reply({ embeds: [embed.setImage(url).setURL(url).setColor("Random")] });

            });

        }



        //generating a random meme from any platform

        if (!platform) {

            let memes = [meme];

            memes[Math.floor(Math.random() * memes.length)]();

        }



    }

}