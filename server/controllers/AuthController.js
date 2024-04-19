const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const argon2 = require("argon2");

router.get("/", (req, res) => {
    res.send({msg: "got to auth"});
})

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    
    let hashedPass;
    try{
        hashedPass = await argon2.hash(password);
        console.log(hashedPass);
    }
    catch(err){
        console.log(err);
    }
    try{
        const newUser = await User.create({email: email, password: hashedPass, username: username, savedMessages: []});
        res.send({user: newUser});
    }
    catch(err){
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const findUser = await User.findOne({email});

    if(findUser){
        console.log("found user");
        try{
            if(await argon2.verify(findUser.password, password)){
                console.log("pass match");
                res.send({"user": findUser});
            }
            else{
                console.log("mismatch passwords");
                res.send({"error": "passowrds dont match"});
            }
        }
        catch(err){
            console.log(err);
            res.send({"err":""});
        }
    }
    else{
        console.log("found user");
        res.send({"err": "No user found"});
    }
});

module.exports = router;