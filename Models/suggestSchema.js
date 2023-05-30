const { model, Schema } = require('mongoose');

let suggestSchema = new Schema({
    guildSuggest: String,
    guildChannel: String,
    Enabled: Boolean,
})

module.exports = model("suggest", suggestSchema)