const { model, Schema } = require('mongoose');

let suggestMessage = new Schema({
    guildId: String,
    messageId: String,
    authorId: String,
    votesSi: Array,
    votesNo: Array,
})

module.exports = model("suggestMsg", suggestMessage)