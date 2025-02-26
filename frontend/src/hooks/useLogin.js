import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext.jsx';
/*
    HOOK FUNCTION:
        -STATE VARIABLES:
            -loading & setLoading: for setting the state when client-side is loading
            -setAuthUser: calling in authorization context which fetches credentials from the user
            and is stored while user is currently logged in.

        -HOOK: 
            1. Call in Login Authorization API by sending inputted username and password
            2. Store user credentials to the local storage as a context which will be used by children components
            3. 

*/
const useLogin = () => {
    //set states here:
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const login = async (username,password) => {
        
        const success = handleInputErrors(username, password);
		if (!success){
            console.log("Failed")
            return;
        } 
		setLoading(true);
        //call the login api by sending a POST request
        try{
            
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            //set local storage item (username and password in JSON)
            localStorage.setItem("user-info", JSON.stringify(data));
            //update here
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);

        } finally{
            setLoading(false);
        }


    };

    return { loading, login };
}

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}