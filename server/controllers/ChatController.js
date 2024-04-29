const express = require("express");
const router = express.Router();

const { createServer } = require("node:http");
const server = createServer(router);
const { Server } = require("socket.io");
const io = new Server(server,
{
    path: "../server.js"
});

router.get("", ( req, res ) => {
    console.log(req);
    res.send({"msg":"connected to, well, chat controller, I guess"});
});

io.on('connection', (socket) => {
    console.log("someone connected");
});

module.exports = router;