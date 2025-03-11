import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [chats, setChats] = useState([]);

    //fetches all users in the system

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                //wait and fetch from API endpoint
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);

            } catch (error) {
                toast.error(error.message);

            } finally {
                setLoading(false);
            }


        }
        const getChats = async () => {
            setLoading(true);
            try {
                let authId = JSON.parse(localStorage.getItem("user-info"))._id;
                const res = await fetch(`/api/messages/get-msg/${authId}`);
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setChats(data)




            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }     
        
        }



        getConversations();
        getChats();

    },[]);
    return { loading, conversations, chats }
};

export default useGetConversations;