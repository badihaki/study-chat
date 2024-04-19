const { model, Schema } = require("mongoose");
const Message = require("./MessageModel");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    savedMessages: [Message]
})

const User = model("User", userSchema);

module.exports = User;