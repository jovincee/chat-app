import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';



const useCountUnread = (arrUsers,userId) => {
    const [hasUnreadMsgs, setHasUnreadMsgs] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    
  

    useEffect(() => {
        const countUnread = async () =>{
            console.log('array: ', arrUsers.includes(userId));
            console.log("count unread: ")
            setLoading(true)
            if (arrUsers.includes(userId)){
                try {
                    console.log("yes");
                    const res = await fetch(`/api/messages/get-unread-msgs/${userId}`)
                    const data = await res.json();
                    console.log("number of unread:", data.unreadCount);
                    setUnreadCount(data.unreadCount)
                   
                    if (data.error) throw new Error(data.error);
                } catch (error) {
                    toast.error(error.message)
                } finally {
                    
                    setHasUnreadMsgs(true)
                }
            }
            else {
                return;
            }

        }
        countUnread();

    },[arrUsers,userId])

    return {unreadCount, hasUnreadMsgs}
    








}

export default useCountUnread;