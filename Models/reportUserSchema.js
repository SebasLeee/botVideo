const {model, Schema} = require('mongoose')

let reportSchema = new Schema({
    reportGuildId:String,
    reportUserId:String,
    reportMessageId:String
})

module.exports = model('reportUser', reportSchema)