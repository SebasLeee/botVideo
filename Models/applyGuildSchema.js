const {model, Schema} = require('mongoose')

let applyGuildSchema = new Schema({
    applyGuildId:String,
    applyChannelLogs:String,
    applyChannelDisplay:String,
    applyDescription:String,
    applyRole:String,
    applyMessage:String,
    applyGuildStatus:Boolean,
})

module.exports = model('applyGuild', applyGuildSchema)