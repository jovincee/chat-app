import {useEffect} from 'react';
import Messages from './Messages.jsx';
import MessageInput from './MessageInput.jsx';
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation.js';
import { useAuthContext } from '../../context/AuthContext.jsx';

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    //if true, show noSelectedChat component, if false, show 

    useEffect(() => {
        //cleanup function; unmount; resets state
        return () => setSelectedConversation(null)

    },[setSelectedConversation])


  const noSelectedChat = true;
  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? (
            <NoSelectedChat />
        ) : (
            <MessageBox />            
        )}
      
    </div>
  )
}

export default MessageContainer;
const MessageBox = (fullName) => {
    const {selectedConversation, setSelectedConversation} = useConversation();
    
    return (
            
        <>
            {/* Header */}
            <div className='bg-slate-300 px-4 py-2 mb-2'>
                <span className='label-text'>To:</span>{" "} 
                <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
            </div>

            <Messages />
            <MessageInput/>
            
        
            
            </>
    )

}
const NoSelectedChat = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-1g md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p> Welcome &#x1F44B; {authUser.fullName} </p>
                <p> Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />

            </div>



        </div>
    );




};
