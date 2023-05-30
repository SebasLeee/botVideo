const {model,Schema} = require('mongoose')

let userApplySchema = new Schema({
    applyGuildId:String,
    applyUserId:String,
    applyMessageId:String
})

module.exports = model("applyUser", userApplySchema)