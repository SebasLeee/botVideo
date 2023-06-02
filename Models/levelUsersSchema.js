const { model, Schema } = require('mongoose')

const levelUserSchema = new Schema({
    guildId: String,
    userId: String,
    userXp: Number,
    userXpCheck: Number,
    userLevel: Number,
})

module.exports = model("leveluser", levelUserSchema)