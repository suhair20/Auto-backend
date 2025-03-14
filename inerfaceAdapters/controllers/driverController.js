import SignupDriver from "../../useCases/Drivercase/SignupDriver.js";
import OtpService from "../../infrastructure/services/OTP.js"
import Otpverifying from "../../useCases/Drivercase/OtpVerifying.js";
import Resendotp from "../../useCases/Drivercase/Resendotp.js";
import Verification from "../../useCases/Drivercase/Verification.js";
import LoginDriver from "../../useCases/Drivercase/LoginDriver.js";

import { log } from "console";


class DriverController{
    constructor(signupDriver=new SignupDriver(),
    otpService=new OtpService(),
    otpverifying=new Otpverifying(),
    resendotp=new Resendotp(),
    verification = new Verification(),
    loginDriver=new LoginDriver()
   
    
){
       this.signupDriver=signupDriver
       this.otpService=otpService
       this.otpverifying=otpverifying
       this.resendotp=resendotp
       this.Verification = verification
       this.loginDriver=loginDriver
      
      
    }

    signup= async(req,res)=>{
        try {
        
             
            console.log('vanuuuuu');
            
             const {  password,email } = req.body;
             
             console.log(password,"pass");
             const user = await this.signupDriver.execute(password,email)
             await this.otpService.sendOtp(email)
             res.status(201).json({ success: true, user });

        }catch (error) {
            console.log(error);
        }
    }


    verifyotp =async(req,res)=>{
        try {
            console.log("vnnitilla");
            const {email,otp}=req.body
            console.log("yvide");
            console.log(req.body);
            const result=await this.otpverifying.excute(email,otp)
            res.status(201).json({ message: 'user created', result });
        } catch (error) {
            console.log(error);
        }
    }



    resendingOtp=async(req,res,next)=>{
        try {
            console.log('resend otp');
            const {email}=req.body
            await this.resendotp.excute(email)
           

        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    verification=async(req,res,next)=>{
        try {
            
            const { name, experience, phone, model, vehicleNumber, color,email } = req.body;
            const files=req.files
           
            const result=await this.Verification.execute(
                name,
                experience,
                phone,
                model,
                vehicleNumber,
                color,
                email,
                files
            )
            
         if(result){
          
           res.status(201).json({ message: 'user created' });
         }
        } catch (error) {
            next(error)
            console.log(error);
        }
    }

    login =async (req,res,next)=>{
        try {
            
       
        const  {email,password}=req.body
        const {driverToken,User}=await this.loginDriver.excute(email,password)
        res.cookie('driverToken',driverToken,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        })
        res.status(201).json({ success: true, User });
    } catch (error) {
            console.log(error);
            
    }

    }


    checkAuth=async()=>{
        try {
            console.log(" driverAuth:: ",req.driver);
            
           console.log('Auth driversucess')
           res.json({success:true,driver:req.driver})
       } catch (error) {
           console.log(error);
           
       }
    }


}

export default DriverController