/*
These are the controllers for different user authentications which are:
-signup route
-login route
-logout route
*/

import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

/*
SIGNUP CONTROLLER: 
-grab POST JSON request and gather its variables
-check if password matches with confirmed password
-authenticate user by finding if user exists in db
-hash password for security
-generate profile pic then create new user model
-if new user, create a cookie to confirm that the user is logged in
*/
export const signup = async (req, res) => {
    try{
        //get input from user after client sending a POST request
        const { fullName, username, password, confirmPassword, gender } = req.body;
        //authenticate password; if password doesn't match then send an error status 400
        if(password !== confirmPassword) {
            return res.status(400).json({error:"Password don't match"});
        }

        const user = await User.findOne({username});
        //authenticate user: if user exists in db, then send an error status 400 since user already exists
        if(user) {
            return res.status(400).json({error:"Username already exists"});
        }

        //hash password here; required for security:
        const salt = await bcryptjs.genSalt(10); //higher value, takes longer to create the salt
        const hashedPassword = await bcryptjs.hash(password, salt);




        //avatar: https://avatar.iran.liara.run/public/boy?username=Scott

        //generate profile pic depending on the user's gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        //create new user model; hash the password and store it to the database
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic //dynamic variable; if gender is male, then set profile pic to boyProfilePic
        });

        if (newUser) {
            //save newUser to db; generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
        

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});

    }
};
/*
LOGIN CONTROLLER: 
-grab POST JSON request and gather its variables
-find if user exists
-check if the password is correct
-if password is correct then create a cookie, confirming that the user is logged in to the computer
*/
export const login = async (req, res) => {
    try{
        //get username and password from body
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcryptjs.compare(password, user?.password || ""); //compare password, if undefined or null, 
                                                                                        //then set as empty so that it gets sent as a request
                                                                                        //rather than setting it as an error in the 
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        //create cookie by generating a jwd token
        generateTokenAndSetCookie(user._id, res);

        //send status back:
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
        


    } catch(error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

/*
LOGOUT CONTROLLER:
-remove cookie, then send status 200 confirming that the user has logged out.
*/
export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({ message: "Logged out successfully"});

    }catch (error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

