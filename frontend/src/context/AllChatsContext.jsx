import { createContext, useContext, useState } from 'react';

export const AllChatsContext = createContext();

export const useAllChatsContext = () => {
    return useContext(AllChatsContext);
}

export const AllChatsContextProvider = ({ children }) => {
    //if local storage is empty, then set user-info to null
    const [chats,setChats] = useState([])

    return <AllChatsContext.Provider value={{chats,setChats}}>
        
        {children}
        
        
        </AllChatsContext.Provider>;
};