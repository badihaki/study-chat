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