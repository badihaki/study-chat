const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const mongooseURI = "mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster";
const authController = require("./controllers/AuthController.js");

//MARK: Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//MARK: Routes
app.use("/auth", authController);

mongoose.connect(mongooseURI).then( () => {
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    })
})

// mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster