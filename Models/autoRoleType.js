const {model, Schema} = require('mongoose')

let autoRoleType = new Schema({
    guildId:String,
    userRole:String,
    botRole:String,
})

module.exports = model("autoroleTyp", autoRoleType)