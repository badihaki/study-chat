const router = require("express").Router();
const http = require("http").Server(router);
const io = require("socket.io")(http);

// const express = require("express");
// const router = express.Router();
// const { createServer } = require("node:http");
// const server = createServer(router);
// const { Server } = require("socket.io");
// const io = new Server(server,
// {
//     path: "../server.js"
// });

router.get("", ( req, res ) => {
    console.log(req);
    res.send({"msg":"connected to, well, chat controller, I guess"});
});

io.on('connection', (socket) => {
    console.log("someone connected");
    let previousID;

    const safeJoin = ( currentID ) => {
        socket.leave(previousID);
        socket.join(currentID, () => {
            console.log(`Socket ${socket.id} joined room ${currentID}`);
        })
        previousID = currentID;
    }

    socket.on("getChat", (msg) => {
        console.log(`Message recieved: ${msg}`);
    })
});

module.exports = router;