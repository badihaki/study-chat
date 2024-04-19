const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const mongooseURI = "mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster";


app.get("/", (req, res) => {
    console.log(req.body);
    res.send({msg: "hello tst"});
})

mongoose.connect(mongooseURI).then( () => {
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    })
})

// mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster