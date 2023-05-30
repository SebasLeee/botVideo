const { model, Schema} = require('mongoose');

const ticketSupport = new Schema({
    guildId:String,
    membersId:Array,
    channelId:String,
    closed:Boolean,
    open:Boolean,
    openBy:String
})

module.exports = model("tsupport", ticketSupport)