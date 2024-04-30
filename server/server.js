const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const mongooseURI = "mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster";

//MARK: socket stuff
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

io.on('connection', (socket) => {
    console.log("user connected");
    
    // let previousID;
    // const safeJoin = ( currentID ) => {
    //     socket.leave(previousID);
    //     socket.join(currentID, () => {
    //         console.log(`Socket ${socket.id} joined room ${currentID}`);
    //     })
    //     previousID = currentID;
    // }

    socket.on("message", (msg) => {
        msg.id = randomUUID();

        console.log(`Message recieved:`);
        console.log(msg);
        
        socket.emit("message", msg);
    })
    
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
});

//MARK: controller imports
const authController = require("./controllers/AuthController.js");
const { randomUUID } = require("crypto");
// const chatController = require("./controllers/ChatController.js");

//MARK: Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//MARK: Routes
app.use("/auth", authController);
// app.use("/chat", chatController);

mongoose.connect(mongooseURI).then( () => {
    app.listen(port, ()=>{
        console.log(`Listening on port ${port}`);
    })
})

const socketPort = 8080
httpServer.listen(socketPort, () => {
    console.log(`listening for ws connections via port ${socketPort}`);
})

// mongodb+srv://jojackblack:IMN6Sfl5cesPKWL8@sc-cluster.bt1tdfm.mongodb.net/?retryWrites=true&w=majority&appName=SC-Cluster