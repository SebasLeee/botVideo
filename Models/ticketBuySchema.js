const { model, Schema} = require('mongoose');

const ticketsBuy = new Schema({
    guildId:String,
    membersId:Array,
    categoryId:String,
    channelId:String,
    closed:Boolean,
    open:Boolean,
    openBy:String
})

module.exports = model("tbuy", ticketsBuy)