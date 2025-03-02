import mongoose from 'mongoose';


const conversationSchema = new mongoose.Schema({
    //participants is an array of Users involved in this message.
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',                //must be consistent with model names; very case sensitive!!
        },
    ],
    //messages is an array of Message object
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",             //must be consistent with model names; very case sensitive!!
            default: [],
        },
    ],

    //add unread message count here to keep track of unread messages; updates when user opens the chat.
    unreadCount: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;