import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

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

            return () => socket.close();
        } else {
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