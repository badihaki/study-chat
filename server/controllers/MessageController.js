const router = require("express").Router();
const { json } = require("express");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");

router.post("/:id", async (req, res) =>{
    const messages = [];
    for(const msgID of req.body){
        messages.push(await Message.findById(msgID));
    }
    console.log("messages!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(messages);
    res.send(JSON.stringify({messages}));
})

router.post("/", async (req, res) => {
    console.log("saving a new message to messages");
    console.log(req.body);
    const { content, userEmail } = req.body;
    let user;
    try{
        user = await User.findOne({email:userEmail});
        const msg = await Message.create({content, keywords:[]});
        const updatedMessageArr = [...user.savedMessages, msg];
        const updatedUser = await User.findOneAndUpdate(
            {email:userEmail},
            {savedMessages: updatedMessageArr},
            { // options here
                returnOriginal:false // make sure we return updated user info
            }
        )
        res.send(JSON.stringify({msg:msg, user:updatedUser}));
    }
    catch(err){
        const error = new Error(err);
        res.status(400).send(JSON.stringify(error));
    }
})

router.patch("/:id", ( req, res ) => {
    console.log(`updating message`);
    console.log(req.params);
    res.send("update")
})

router.delete("/:id", ( req, res ) => {
    console.log(`deleting message ${req.params.id}`);
    res.send("Deleted");
})

module.exports = router;