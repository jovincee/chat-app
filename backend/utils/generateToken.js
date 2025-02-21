//generate JTW token and set to the cookie
import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    //takes the payload (information that will be embedded in the jwt token); creates a digital signature
    //we use the userid as the payload
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    //set it as cookie
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000, //convert to milliseconds format
        httpOnly: true, //should be accessible in http only to prevent access as attacks (eg. cross-site scripting attack)
        sameSite:"strict", //CRSF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development", //only secure if the environment is not in development mode.
    });
}

export default generateTokenAndSetCookie;