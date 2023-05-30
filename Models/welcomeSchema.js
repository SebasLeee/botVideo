const {model, Schema} = require('mongoose');

let welcomeSchema = new Schema({
    Guild:String,
    Channel: String,
    MessageDes:String,
    ImagenDesc:String,
    Color:String,
})

module.exports = model("welcome", welcomeSchema)