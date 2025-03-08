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
    const [count, setCount] = useState(0);
    const {unreadCount, setUnreadCount} = useUnreadCountContext();
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const c = getUnreadMessages(chats,authId,conversation._id);
    const hasCount = count > 0 ? true : false
    //begin setting state variable count and iscounted while count changes
    useEffect(() => {       
        setCount(c);       
        if (count > 0) setIsCounted(true);
    },[count])

    return <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
        `}
        /**Set an on event click handler; set iscounted to false so that the notification badge disappears */
        onClick={() => {
            setSelectedConversation(conversation);
            setIsCounted(false);
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
            {isCounted ? (<div className="badge badge-sm badge-secondary">{count}</div>) : ""}

        </div>

    </div>
    
    
    </div>
    <div>
        
    
    </div>
    {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    
    </>;
};

export default ConvBar;