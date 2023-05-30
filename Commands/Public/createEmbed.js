const {SlashCommandBuilder,EmbedBuilder,PermissionFlagsBits} = require('discord.js')
const errReply = require('../../Functions/interactionErrorReply')
const correReply = require('../../Functions/interactionReply')
const userReply = require('../../Functions/interactionUserReply')
const botReply = require('../../Functions/interactionBotReply')

const ms = require('ms')
module.exports = {
    Cooldown: ms("10s"),
    data:new SlashCommandBuilder()
    .setName('create-embed')
    .setDescription('Crea un embed totalmente a tu gusto')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption(option=>
        option.setName('color')
        .setDescription('Elige el color que quieres que tenga tu embed')
        .addChoices(
            {name:'Defaul', value:'Default'},
            {name:'White', value:'White'},
            {name:'Aqua', value:'Aqua'},
            {name:'Green', value:'Green'},
            {name:'Blue', value:'Blue'},
            {name:'Yellow', value:'Yellow'},
            {name:'Purple', value:'Purple'},
            {name:'Gold', value:'Gold'},
            {name:'Red', value:'Red'},
            {name:'Grey', value:'Grey'},
            {name:'Navy', value:'Navy'},
            {name:'Random', value:'Random'},
        )
    )
    .addStringOption(option=>
        option.setName('title')
        .setDescription('Escribe el titulo de tu embed')
    )
    .addStringOption(option=>
        option.setName('url')
        .setDescription('Ingresa el link para el titulo')
    )
    .addStringOption(option=>
        option.setName('author')
        .setDescription('Elige el autor')
    )
    .addStringOption(option=>
        option.setName('description')
        .setDescription('Ingresa la descripcion de tu embed')
    )
    .addAttachmentOption(option=>
        option.setName('image')
        .setDescription('Elige el Thumbnail de tu embed')
    )
    .addAttachmentOption(option=>
        option.setName('setimage')
        .setDescription('Elige la imagen de tu embed')
    )
    .addStringOption(option=>
        option.setName('timestamp')
        .setDescription('Quieres que salga el timestamp')
        .addChoices(
            {name:'Si', value:'si'},
            {name:'No', value:'no'},
        )
    )
    .addStringOption(option=>
        option.setName('footer')
        .setDescription('Ingresa el footer de tu embed')
    ),
    async execute(interaction){
        const {options} = interaction
        let color = options.getString('color')
        let title = options.getString('title') 
        let titleURL = options.getString('url')
        let author = options.getString('author')
        let description = options.getString('description') || ' '
        let attachment = options.getAttachment('image')
        let image = options.getAttachment('setimage')
        let timestamp = options.getString('timestamp')
        const embed = new EmbedBuilder()
        if(color){
            if(color === 'Default'){
                embed.setColor(color)
            }
            if(color === 'White'){
                embed.setColor(color)
            }
            if(color === 'Aqua'){
                embed.setColor(color)
            }
            if(color === 'Green'){
                embed.setColor(color)
            }
            if(color === 'Blue'){
                embed.setColor(color)
            }
            if(color === 'Yellow'){
                embed.setColor(color)
            }
            if(color === 'Purble'){
                embed.setColor(color)
            }
            if(color === 'Gold'){
                embed.setColor(color)
            }
            if(color === 'Red'){
                embed.setColor(color)
            }
            if(color === 'Navy'){
                embed.setColor(color)
            }
            if(color === 'Grey'){
                embed.setColor(color)
            }
            if(color === 'Random'){
                embed.setColor(color)
            }
        }
        if(title){
            embed.setTitle(title)
        }
        if(titleURL){
            embed.setURL(`${titleURL}`)
        }
        if(author){
            embed.setAuthor({name:`${author}`})
        }
        if(description){
            embed.setDescription(description)
        }
        if(attachment){
            embed.setThumbnail(attachment.url)
        }
        if(image){
            embed.setImage(image.url)
        }
        if(timestamp){
            if(timestamp ==='si'){
                embed.setTimestamp()
            }else if(timestamp ==='no'){
            }
        }

        await interaction.channel.send({embeds:[embed]})
        await correReply(interaction,'Se envio correctamente el embed',true)

    }
    

};
