import React from 'react'
import { useState } from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const signup = async({fullName, username, password, confirmPassword,gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword,gender});
        
        //check if function handleInputErrors return false, if it does, then stop this function
        if(!success){
            console.log("Failed")
            return;
        } 
           

        setLoading(true);
        //begin appending user info to the back-end database 
        //by sending user info as a POST request to the '/api/auth/signup/' link
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({fullName, username, password, confirmPassword,gender}),
            })
            //get result as a JSON
            const data = await res.json();
            
            //if data returns an error (most likely a server error from the backend)
            //then throw an error:
            if(data.error){
                throw new Error(data.error)
            }

            console.log(data)

            //localstorage
            localStorage.setItem("user-info",JSON.stringify(data))
            //create context so that user info gets passed across different links/components
            //update context
            setAuthUser(data);

        } catch(error) {
            toast.error(error.message)
        } finally {
            console.log("Success!");
            setLoading(false);
        }
        
    };

    return { loading, signup };
}

export default useSignup;

/*
This function checks if the inputs are valid or not.
*/
function handleInputErrors({fullName, username, password, confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Fill in all fields')
        return false
    }

    if (password !== confirmPassword){
        toast.error('Password do not match!')
        return false
    }

    if (password.length < 6){
        toast.error('Password must be at least 6 characters');
        return false

    }

    return true;
}