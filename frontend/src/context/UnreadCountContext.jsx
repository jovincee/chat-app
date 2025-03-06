import { createContext, useContext, useState } from 'react';

export const UnreadCountContext = createContext();

export const useUnreadCountContext = () => {
    return useContext(UnreadCountContext);
}

export const UnreadCountContextProvider = ({ children }) => {
    //if local storage is empty, then set user-info to null
    const [unreadCount,setUnreadCount] = useState(0)

    return <UnreadCountContext.Provider value={{unreadCount, setUnreadCount}}>
        
        {children}
        
        
        </UnreadCountContext.Provider>;
};


