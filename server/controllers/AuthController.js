const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const argon2 = require("argon2");
const jsonWebToken = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { token } = req.body;
    if(!token){
        res.status(400).send({
            "error":"no user found"
        });
        return;
    }
    try{
        const verifiedToken = jsonWebToken.verify(token, "unlock");
        const { email } = verifiedToken.data;
        const user = await User.findOne({email});
        res.status(200).send(JSON.stringify({
            msg: "got to auth",
            user: user
        }));
    }
    catch(err){
        console.log(err);
        res.status(400).send({
            "error":err
        })
    }
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
        const token = jsonWebToken.sign({
            data: {
                email:email,
                password, password
            }
        }, 
        "unlock",
        {expiresIn: '1h'})
        res.send(JSON.stringify({
            user: newUser,
            token: token
        }));
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
                const token = jsonWebToken.sign({
                    data: {
                        email:email,
                        password, password
                    }
                }, 
                "unlock",
                {expiresIn: '1h'});
                res.status(200).send(JSON.stringify({
                    "user": findUser,
                    "token": token
                }));
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