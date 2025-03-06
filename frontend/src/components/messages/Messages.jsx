import { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation.js';
import { useUnreadCountContext } from "../../context/UnreadCountContext.jsx";
import Conversation from '../../../../backend/models/conversation.model.js';
import { useAuthContext } from '../../context/AuthContext.jsx';


const Messages = () => {
  const { selectedConversation } = useConversation();
  const { messages, loading } = useGetMessages();
  const {unreadCount, setUnreadCount} = useUnreadCountContext();
  useListenMessages();
  const lastMessageRef = useRef();

  //use useEffect hook to automatically scroll to the very bottom of the message box
  useEffect(() => {
    setTimeout(() => {
      console.log("Unread count: ", unreadCount);
      
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  },[messages])

  

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {/*If there are existing messages: */}
      {!loading && messages.length > 0 && messages.map((message) => (
        
        <div key={message._id}
          ref={lastMessageRef}
        > 
          <Message key={message._id} message={message} />
        </div>

      ))}
      {/*Create loading skeleton as messages are being fetched */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}

      {/*If not loading state, then begin loading the messages */}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages
