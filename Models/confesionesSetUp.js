const {model, Schema} = require('mongoose')

let confesionesSchema = new Schema({
    guildId:String,
    channelId:String,
})

module.exports = model("confesiones", confesionesSchema)