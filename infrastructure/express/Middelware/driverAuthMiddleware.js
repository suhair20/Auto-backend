
import DriverRepository from "../../../repository/implementation/DriverRepository.js";
import Jwt from "../../services/Jwt.js";

const driverRepository=new DriverRepository()
const Jwtservice=new Jwt()


const driverAuthMiddleware= async (req,res,next)=>{
    try {

        
        
        const Token=req.cookies.driverToken
        
        
        if(!Token){
            return res.status(401).json({message:"driver not autenticated "})
        }

        const decode=Jwtservice.verifyToken(Token)

        const driver= await driverRepository.findById(decode.id)
       

        if(!driver){
            return res.status(404).json({message:"User not found"})
        }

        req.driver=driver
        next()

    } catch (error) {
        
    }
}

export default driverAuthMiddleware