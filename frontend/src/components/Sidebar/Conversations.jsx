import ConvBar from "./ConvBar.jsx";
import useGetConversations from "../../hooks/useGetConversatins.js";
import { getRandomEmoji } from "../../utils/emojis.js";


const Conversations = () =>{
    const { loading, conversations } = useGetConversations();
    console.log("CONVERSATIONS: ", conversations);
    //call hook here:
    useGetConversations();
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation,idx) => (
                <ConvBar 
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                
                
                />



            ) )}
            {loading ? <span className='loading loading-spinner '></span> : null}
        </div>
    );

}

export default Conversations;