import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        //get message and id as receiver id
        const { message } = req.body;
        const { id:receiverId } = req.params;
        //need a middleware to fetch the senderId
        const senderId = req.user._id;      

        //find conversation based on senderId and receiverId
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        //if no conversation exist, then create conversation where participants are both the sender and receiver
        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
            });
        }
        //create message:
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO FUNCTIONALITY

        //save message to db
        // await conversation.save();
        // await newMessage.save();
        //save message to db: This will run beside each other/in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
    // console.log("message sent", req.params.id)
};

export const getMessages = async (req, res) => {

    try{
        //get id from params;
        //get senderId from user's id
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
    
        //begin finding the message on the sender id and receiverid
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");  //not reference; returns message object

        // //if conversation doesn't exist, return empty array of messages.
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        //output as JSON status and show its message contents 
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

};
