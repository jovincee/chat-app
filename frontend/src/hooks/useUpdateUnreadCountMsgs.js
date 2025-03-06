import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useUnreadCountContext } from '../context/UnreadCountContext';
import useConversation from '../zustand/useConversation';

const useUpdateUnreadCountMsgs = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation } = useConversation();
    const {unreadCount, setUnreadCount} = useUnreadCountContext();

    useEffect(() =>{
        const updateUnreadCount = async () => {
            setLoading(true)
            //update unread count:
        
            try {
              const res = await fetch(`/api/messages/update/${unreadCount},${selectedConversation._id}`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    

                }
              );
              const data = await res.json();
              
              if(data.error) throw new Error(data.error)
              setUnreadCount(0);        //set unread count to 0
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        const updateUnreadMsgs = async () => {
            setLoading(true)
            //update unread count:
            try {
              const res = await fetch(`/api/messages/update-msg/${selectedConversation._id}`,
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    

                }
                
              );
              const data = await res.json();
              if(data.error) throw new Error(data.error)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }

        }
    
        if(selectedConversation?._id){
          updateUnreadCount();
          updateUnreadMsgs();
          
        } 
    
      },[selectedConversation?._id]);
    
     
}

export default useUpdateUnreadCountMsgs;