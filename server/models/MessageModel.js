const { model, Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
    content: String,
    keywords: [String],
    // user: {type: mongoose.Types.ObjectId, ref: "User"}
})

const Message = model("Message", messageSchema);

module.exports = Message;