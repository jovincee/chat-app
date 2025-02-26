import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    //if local storage is empty, then set user-info to null
    const [authUser,setAuthUser] = useState(localStorage.getItem("user-info") || null)

    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        
        {children}
        
        
        </AuthContext.Provider>;
};