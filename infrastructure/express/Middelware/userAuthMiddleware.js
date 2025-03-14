    
import userRepository from "../../../repository/implementation/UserRepository.js";


import Jwt from "../../services/Jwt.js";


const UserRepository=new userRepository()
const Jwtservice= new Jwt()



const userAuthMiddleware =async (req,res,next)=>{
     console.log("midelse");
     
    try {
        console.log("heloo");
        
        const Token= req.cookies.token
        console.log("token teyye",Token);
        
        if(!Token){
            return res.status(401).json({message:"user not authenticated"})
        }  
        console.log("hii");
        const decode= Jwtservice.verifyToken(Token)
   console.log(decode);
   
   
        const user= await UserRepository.findById(decode.id)
console.log(user);

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user=user
        next()


    } catch (error) {
          
        return res.status(401).json({message:"Invalid or expired token"});
    }


}

 export default userAuthMiddleware