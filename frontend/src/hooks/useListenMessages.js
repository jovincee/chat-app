import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notifSound from "../assets/sounds/notification.mp3";
const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    //listener event for oncoming message to the user
    //once socket, messages and setMessage value changes, use this hook
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            
            newMessage.shouldShake = true;
            const sound = new Audio(notifSound);
            sound.play();
            //update state:
            setMessages([...messages,newMessage])
        })

        return () => socket?.off("newMessage");
    },[socket, setMessages, messages])
}

export default useListenMessages;