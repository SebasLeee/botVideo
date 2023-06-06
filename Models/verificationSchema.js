const { Schema, model } = require('mongoose')

const verifySchema = new Schema({
    guildId:String,
    channelId:String,
    roleId:String,
})

module.exports = model("verify", verifySchema)