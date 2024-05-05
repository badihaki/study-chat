const router = require("express").Router();
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

router.patch("/:id", async ( req, res ) => {
    console.log(`updating message`);
    console.log(req.params.id);
    console.log(req.body);
    const msg = await Message.findByIdAndUpdate(req.params.id, {content: req.body.content},{
        returnOriginal: false
    })
    console.log(msg);
    res.send(JSON.stringify(msg));
})

router.delete("/:id", async ( req, res ) => {
    console.log(`deleting message ${req.params.id}`);
    try{
        const user = await User.findById(req.body.userID);
        const deletedMsg = await Message.findById(req.params.id);
        const messages = [];
        for(const message of user.savedMessages){
            messages.push(await Message.findById(message));
        }
        const updatedMessageArr = await messages.filter( (msg) => msg.id !== deletedMsg.id )
        console.log("this is the new list:");
        console.log(updatedMessageArr);
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {savedMessages: updatedMessageArr},
            {returnOriginal: false}
        )
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).send(JSON.stringify({user:updatedUser}));
    }
    catch(err){
        const error = new Error(err);
        res.status(400).send(JSON.stringify(error));
    }
})

module.exports = router;