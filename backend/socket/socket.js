import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

//get online users
const userSocketMap = {};

io.on("connection", (socket )=> {
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;
    //emit is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //socket.on for listening to events; used by both client and server sides
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        //delete client userid on logout
        delete userSocketMap[userId];
        //broadcast to all connected clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });





})

export {app, io, server}