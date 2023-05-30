const { Attachment, AttachmentBuilder } = require('discord.js');
const welcomeSchema = require('../../Models/welcomeSchema');
const canvas = require('canvas')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        // SISTEMA DE INGRESO AL SERVIDOR 
        const welcomeData = await welcomeSchema.findOne({ Guild: member.guild.id })
        if (!welcomeData || !welcomeData.Channel) return;
        if (welcomeData) {
            try {
                const welcomeChannel = member.guild.channels.cache.get(welcomeData.Channel)
                const welcomeDesc = welcomeData.MessageDes
                const welcomeImg = welcomeData.ImagenDesc
                const welcomeColor = welcomeData.Color

                const background = await canvas.loadImage(welcomeImg)
                const cnv = canvas.createCanvas(background.width, background.height)
                const ctx = cnv.getContext("2d")

                const avatar = await canvas.loadImage(member.user.displayAvatarURL({extension:"png"}))

                ctx.drawImage(background, 0, 0, background.width, background.height)
                ctx.save()

                // CALCULAMMOS EL RADIO DEL CIRCULO

                const avatarRadius = background.width * 0.15
                ctx.beginPath()
                ctx.arc(background.width * 0.5, background.height * 0.3, avatarRadius, 0, Math.PI * 2, true)
                ctx.closePath()
                ctx.clip()

                // CREAMOS EL AVATAR

                const avatarSize = avatarRadius*2
                ctx.drawImage(avatar, background.width * 0.5 - avatarSize / 2, background.height * 0.3 - avatarSize / 2, avatarSize, avatarSize)

                // DIBUJAR EL BORDE DEL CIRCULO

                ctx.strokeStyle = "#f2a900"
                ctx.lineWidth = background.width * 0.01
                ctx.stroke()

                ctx.restore()

                const welcomeFontSize = background.width * 0.05
                ctx.font = `${welcomeFontSize}px Arial`
                ctx.fillStyle = `${welcomeColor}`
                ctx.textAlign = 'center'
                ctx.fillText(`Bienvenido/a`, cnv.width / 2, background.height*0.79)

                const membmerFontSize = background.width * 0.035
                ctx.font = `${membmerFontSize}px Arial`
                ctx.fillStyle = `${welcomeColor}`
                ctx.textAlign = 'center'
                ctx.fillText(member.user.tag.toUpperCase(), cnv.width / 2, background.height*0.89)

                const descFontSize = background.width * 0.025
                ctx.font = `${descFontSize}px Arial`
                ctx.fillStyle = `${welcomeColor}`
                ctx.textAlign = 'center'
                ctx.fillText(`${welcomeDesc}`, cnv.width / 2, background.height*0.99)

                const canvasImageg = new AttachmentBuilder(cnv.toBuffer("image/png"), {name:'image.jpg'})
                await welcomeChannel.send({content:`<@${member.user.id}> Bienvenido al servidor`, files:[canvasImageg]})
            } catch (error) {
                console.log(error);
            }
        }
    }
};

