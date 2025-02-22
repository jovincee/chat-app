import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id:receiverId } = req.params;
        //need a middleware to fetch the senderId
        const senderId = req.user._id;      

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

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
}