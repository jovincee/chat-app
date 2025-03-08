import ConvBar from "./ConvBar.jsx";
import useGetConversations from "../../hooks/useGetConversatins.js";
import { getRandomEmoji } from "../../utils/emojis.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useConversation from '../../zustand/useConversation.js';
import { useAllChatsContext } from "../../context/AllChatsContext.jsx";
import { useEffect } from 'react'


function filterUsers(chats, userId){
    let arr_users = []
    chats.map((chat) => (
        arr_users = arr_users.concat(chat.participants)
    ));

    arr_users = arr_users.filter(e=>e !== userId);
    
    var users = [...arr_users]

    return users;

}

const Conversations = () =>{
    const { authUser } = useAuthContext();
    const { loading, conversations, chats } = useGetConversations();
    const { setChats } = useAllChatsContext();
   

    // console.log("CONVERSATIONS: ", conversations);
    // console.log("chats", chats);

    // let arrUsers = filterUsers(chats,authUser._id);
    
    useEffect(() => {
        setChats(chats);
    }, [chats])
    
    //call hook here:
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {/*Get conversations list and render components on each element*/}
            {conversations.map((conversation,idx) => (
                //call hook here:
                <ConvBar 
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                    chats={chats}
                    authId={authUser._id}
                
                
                />



            ) )}
            {loading ? <span className='loading loading-spinner '></span> : null}
        </div>
    );

}

export default Conversations;