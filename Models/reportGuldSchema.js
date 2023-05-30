const {model, Schema} = require('mongoose')

let reportSchema = new Schema({
    reportGuildId:String,
    reportChannelId:String,
})

module.exports = model('reportGuild', reportSchema)