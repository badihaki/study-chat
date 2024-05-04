const router = require("express").Router();
const Message = require("../models/MessageModel");

router.get("/", (req, res) =>{
    console.log("getting messages");
    console.log(req.body);
    res.send(`ok, get msg`);
})

router.post("/", (req, res) => {
    console.log("posting a new message to messages");
    console.log(req.body);
    res.send(JSON.stringify({msg:`postin`}));
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