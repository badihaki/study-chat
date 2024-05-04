const { model, Schema, default: mongoose } = require("mongoose");
// const { messageSchema } = require("./MessageModel");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    // savedMessages: [messageSchema]
    savedMessages: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
})

const User = model("User", userSchema);

module.exports = User;