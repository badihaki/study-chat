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
    
    const findUser = await User.findOne({email});
    if(findUser){
        res.status(409).send({
            "error": "There's already a user with this email. You need to use a unique email."
        })
        return;
    }

    
    let hashedPass;
    try{
        hashedPass = await argon2.hash(password);
        console.log(hashedPass);
    }
    catch(err){
        console.log(err);
        res.status(409).send({"error":"error cant hash pass"});
    }
    try{
        const newUser = await User.create({email: email, password: hashedPass, username: username, savedMessages: []});
        res.send({user: newUser});
    }
    catch(err){
        console.log(err);
        res.status(409).send({"error":"didnt make a new user!?"});
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
                res.status(200).send(JSON.stringify({"user": findUser}));
            }
            else{
                console.log("mismatch passwords");
                res.status(409).send(JSON.stringify({"error": "Messed up your password, cuz it's wrong!"}));
            }
        }
        catch(err){
            console.log(err);
            res.status(409).send({"error":"Couldnt verify password"});
        }
    }
    else{
        console.log("found user");
        res.send({"error": "No user found"});
    }
});

module.exports = router;