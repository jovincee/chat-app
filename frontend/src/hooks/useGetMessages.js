import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading,setLoading] = useState(false)
  const {messages, setMessages, selectedConversation} = useConversation()
  //should immediately run while this hook is called
  useEffect(() =>{
    const getMessages = async () => {
        setLoading(true)
        try {
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const data = await res.json();
          if(data.error) throw new Error(data.error)
          setMessages(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    //get another hook inside useEffect to update the unread count
    // const updateUnreadCount = () => {
    //   console.log(`Unread count: ${unreadCount}`);
      
    // }
    if(selectedConversation?._id){
      getMessages();
      
    } 

  },[selectedConversation?._id, setMessages]);

  return { messages, loading };
}

export default useGetMessages;
