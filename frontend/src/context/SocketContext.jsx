import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
/**
 * NOTE: MESSAGE feature only works properly when both clients
 * don't share the same authorized user. To test that the chat functionality 
 * works, one of the browsers must operate in incognito mode so that the 
 * authorized user context doesn't conflict with both windows.
 * 
 * 
 */
const SocketContext = createContext();

//use hook to consume all functions here:
export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
    //create states for:
    /*
    socket: obtaining socket for current user
    onlineUsers: obtain info for all online users
    */
    const [socket, setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(() => {
        if(authUser){
            //create socket for client
            const socket = io("http://localhost:5000",{
                query:{
                    userId: authUser._id,
                }
            })
            setSocket(socket);


            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })
            //it is important to close socket after use
            return () => socket.close();
        } else {
            //if a socket is still open, close it
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return (
        <SocketContext.Provider value= {{socket, onlineUsers}}>
            {children}

        </SocketContext.Provider>
    )
}