import React from 'react'
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast"

const useLogout = () => {
    //state variables; 
    const [loading,setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()


    const logout = async () => {
        setLoading(true)
        //call the logout functionality by using the logout controller from the backend
        //while calling its API link (logout) through sending a POST request
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type" : "application/json"}
            });
            
            const data = await res.json()
            //check if fetched data has an error
            if(data.error){
                throw new Error(data.error)
            }

            //remove user's logged in credentials and info from storage
            //and set authorized user to null
            localStorage.removeItem("user-info")
            setAuthUser(null)


        } catch (error){
            toast.error(error.message)

        } finally{
            setLoading(true)
    
        }


    };

    return {loading, logout};


}

export default useLogout
