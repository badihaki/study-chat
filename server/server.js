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

//MARK: Import the functions from User
const { getUser, getAllUsersInRoom, addUser, removeUser, users, rooms } = require("./ChatConfig.js")

io.on('connection', (socket) => {
    console.log("user connected");

    socket.on("joinRoom", ( {username, roomID}, callback ) => {
        // console.log("Socket:");
        // console.log(socket);
        const { user, error } = addUser(socket.id, username, roomID);
        // console.log("returned user:");
        // console.log(user);
        if(error){
            // console.log("ERROR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            return callback(error.error);
        }
        if(!user){
            // console.log("ERROR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
            // console.log("No user");
            return;
        }
        socket.join(user.roomID);
        socket.in(`${roomID}`).emit("notification", `${username} just joined the room`);
        io.in(roomID).emit("users", getAllUsersInRoom(roomID));
        callback();
    })
    
        socket.on("message", ( msg ) => {
            console.log("got message");
            console.log(msg);
            const user = getUser(socket.id);
            console.log("user::");
            console.log(user);
            console.log(`~~~!  NOTICE:: ${user.userName} is trying to send message '${msg.msg.content}' to room ${user.roomID}  !~~~~`);
            console.log(rooms);
            const roomID = rooms.find(room => room === user.roomID);
            msg._id = randomUUID();
            if(roomID){
                io.in(roomID).emit("message", msg);
            }
            else{
                io.emit("message", `Can't find room`);
            }
        })
        
        socket.on("disconnect", () => {
            console.log("user disconnected");
            const user = removeUser(socket.id);
            if( user ){
                io.in(user.room).emit("notification", `${user.name} left the channel`);
                io.in(user.room).emit("users", getAllUsersInRoom(user.room));
            }
        })

    // socket.on("getRooms", ()=>{
    //     const rooms = [];
    //     users.map(user => user.roomID).forEach( room => {
    //         if(!rooms.includes(room)){
    //             rooms.push(room);
    //         }
    //     })
    //     io.emit("notification")
    // })
    
    // let previousID;
    // const safeJoin = ( currentID ) => {
    //     socket.leave(previousID);
    //     socket.join(currentID, () => {
    //         console.log(`Socket ${socket.id} joined room ${currentID}`);
    //     })
    //     previousID = currentID;
    // }

    // socket.on("message", (msg) => {
    //     msg._id = randomUUID();

    //     console.log(`Message recieved:`);
    //     console.log(msg);
        
    //     io.emit("message", msg);
    // })
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
app.get("/getRooms", ( req, res )=>{
    const rooms = [];
    users.map(user => user.roomID).forEach( room => {
        if(!rooms.includes(room)){
            rooms.push(room);
        }
    })
    console.log("rooms::");
    console.log(rooms);
    res.send(rooms);
});


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