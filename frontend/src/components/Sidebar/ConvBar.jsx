import { useSocketContext } from "../../context/SocketContext";
import { useUnreadCountContext } from "../../context/UnreadCountContext.jsx";
import useConversation from "../../zustand/useConversation";
import useCountUnread from "../../hooks/useCountUnread.js";
import {useState, useEffect} from 'react';
import { useAuthContext } from "../../context/AuthContext.jsx";

const getUnreadMessages = (chats,authId,otherId) => {
    let num = 0;      //default value

    let userChat = chats.find(chat => chat.recentSender === otherId);
    if (userChat){
       num = userChat.unreadCount;
    }
    return num;



}
const ConvBar = ({conversation,lastIdx,emoji,chats,authId}) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    
    const [isCounted, setIsCounted] = useState(false)
    
    const {unreadCount, setUnreadCount} = useUnreadCountContext();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const count = getUnreadMessages(chats,authId,conversation._id);
    const hasCount = count > 0 ? true : false
    
   
    
    

    
    

    // const { unreadCount, hasUnreadMsgs } = useCountUnread(arrUsers,conversation._id);
    // if (unreadCount > 0){ setHasUnreadMsgs(true) }
    

    return <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() => {
            setSelectedConversation(conversation);
            setUnreadCount(count);
            
        }}
        >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
                <img src={conversation.profilePic} alt='user-avatar'/>

            </div>
        </div>

    <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            {hasCount ? (<div className="badge badge-sm badge-secondary">{count}</div>) : ""}

        </div>

    </div>
    
    
    </div>
    <div>
        
    
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    
    </>;
};

export default ConvBar;