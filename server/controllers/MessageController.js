const router = require("express").Router();
const Message = require("../models/MessageModel");

router.get("/", (req, res) =>{
    console.log("getting messages");
    console.log(req.body);
    res.send(`ok`);
})

router.post("/", (req, res) => {
    console.log(req);
    res.send(`ok`);
})

router.patch("/:id", ( req, res ) => {
    console.log(req.params);
})

module.exports = router;