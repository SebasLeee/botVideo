const { model, Schema } = require('mongoose')

const countingSchema = new Schema({
    guildId: String,
    channelId: String,
    count: Number,
    lastPerson: String,
})

module.exports = model("conteo", countingSchema)