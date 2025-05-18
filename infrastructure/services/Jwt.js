import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class Jwt{
    constructor(secret=process.env.JWT_TOKEN,expiresIn='24h'){
        this.secret=secret,
        this.expiresIn=expiresIn
    }

    genrateToken(payload){
     return jwt.sign(payload,this.secret,{expiresIn:this.expiresIn});
     
    }

    verifyToken(token){
        try {
            return jwt.verify(token,this.secret)
            
        } catch (error) {
            console.log(error);
            
            throw new error('Token verifiction failed')
        }
    }
}
export default Jwt