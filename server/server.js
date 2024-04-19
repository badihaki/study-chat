const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(req.body);
    res.send("hello");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

// mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster