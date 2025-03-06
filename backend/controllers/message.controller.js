import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { io, getReceiverSocketId } from "../socket/socket.js";

export const updateUnreadMsgs = async (req, res) => {
    const senderId = req.params.id;
    const receiverId = req.user._id;



    try {
        const msgs = await Message.updateMany(
            { $and: [{senderId: {$eq: senderId}}, {hasRead: {$eq: false}}]},
            { $set: {hasRead: true}}
        )
        if (!msgs) return res.status(200).json([]);

        res.status(200).json(msgs);

    }catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateUnreadCount = async (req, res) => {
    //req must be: <unread-count>,<user-id>
    console.log(req.params.id);
    const strToSplit = req.params.id.split(",");
    const unreadCount = Number(strToSplit[0]);
    const userId = strToSplit[1];
    const authId = req.user._id;

    // console.log("ok",unreadCount, userId)
    try {
            //query through conversation table and find userId and authId; update unread count to 0
            if (unreadCount === 0){
                res.status(201).json({message: "Already updated"
                });
                return;
            } 
            const chat = await Conversation.updateOne(
              {'participants': {$all: [userId, authId]}},
            {$set: { unreadCount: 0}}  
            )

            
        
            
          } catch (error){
            console.log("Error in Messages component: ", error.message);
            return;
          }

    res.status(201).json({message: "success"
    });
}

export const sendMessage = async (req, res) => {
    try {
        //get message and id as receiver id
        const { message } = req.body;
        const { id:receiverId } = req.params;
        const hasRead = false;
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
            hasRead,
            
        });
        //if message is newly sent, append unreadCount to 1
        if(newMessage){
            conversation.messages.push(newMessage._id);
            conversation.unreadCount++;
            conversation.recentSender = senderId;
        }

        //save message to db
        // await conversation.save();
        // await newMessage.save();
        //save message to db: This will run beside each other/in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //only send emit to specific client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }


        

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

//pass on other's sender id as a parameter to the endpoint
export const getNumberOfUnreadMsgs = async (req, res) => {
    try 
        {
            //get id from params;
            //get senderId from user's id
            const { id: userToChatId } = req.params;
            const senderId = req.user._id;

            //begin finding the message on the sender id and receiverid
            const conversation = await Message.find(
                {
                    $and: [
                        {senderId: userToChatId},
                        {receiverId: senderId},
                        {hasRead: false}
                        
                    ]
                }
            )
            console.log(conversation);
                
            // //if conversation doesn't exist, return empty array of messages.
            if (!conversation) return res.status(200).json([]);

            console.log(conversation.length)

            
            //output as JSON status and show its message contents 
            res.status(200).json({unreadCount: conversation.length});
        
            
          

            
        
            

        } catch (error){
            console.log("Error in getMessages controller: ", error.message);
            res.status(500).json({ error: "Internal server error" });

        }

}



export const getConvoInfo = async (req, res) => {
    try
        {
            const loggedInUserId = req.user._id;
            //filter all users that have unread messages/opened chat with user; should
            //return a JSON of conversations.
            const { id: userToChatId } = req.params;

            //begin finding the message on the sender id and receiverid
            const conversation = await Conversation.find({'participants': { $in: loggedInUserId}});

            // //if conversation doesn't exist, return empty array of messages.
            if (!conversation) return res.status(200).json([]);

           
            //output as JSON status and show its message contents 
            res.status(200).json(conversation);

            } catch (error) {
                console.log("Error in getMessages controller: ", error.message);
                res.status(500).json({ error: "Internal server error" });
            }
                

};


