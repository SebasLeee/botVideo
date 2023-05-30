const { model, Schema} = require('mongoose');

const ticketSetup = new Schema({
    guildId:String,
    channelId:String,
    categorySoporte:String,
    categoryBuy:String,
    channelLogs:String,
    handlerRol:String,
    everyoneRol:String,
})

module.exports = model("tickets", ticketSetup)