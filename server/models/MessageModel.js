const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
    content: String
})

const Message = model("Message", messageSchema);

module.exports = Message;