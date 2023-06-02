const { model, Schema } = require('mongoose')

const levelGuildSchema = new Schema({
    guildId: String,
    channelId: String,
})

module.exports = model("levelguild", levelGuildSchema)