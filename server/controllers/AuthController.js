const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({msg: "got to auth"});
})

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    try{
        const newUser = await User.create({email: email, password: password, username: username, savedMessages: []});
        res.send({user: newUser});
    }
    catch(err){
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    // 
});

module.exports = router;