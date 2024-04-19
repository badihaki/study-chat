const { model, Schema } = require("mongoose");
const { messageSchema } = require("./MessageModel");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    savedMessages: [messageSchema]
})

const User = model("User", userSchema);

module.exports = User;