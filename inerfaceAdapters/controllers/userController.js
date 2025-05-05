
// userController.js
import SignupUser from '../../useCases/userCases/SignupUser.js'
import PasswordService from '../../infrastructure/services/PasswordServices.js'
import UserRepository from '../../repository/implementation/UserRepository.js'
import OtpService from '../../infrastructure/services/OTP.js'
import Otpverifying from '../../useCases/userCases/OtpVerifying.js'
import Resendotp from '../../useCases/userCases/Resendotp.js'
import LoginUser from '../../useCases/userCases/LoginUser.js'
import { trusted } from 'mongoose'
import Razorpay from 'razorpay'


const razorpay = new Razorpay({
    key_id: process.env.RAZORPA_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

class UserController {
    constructor(userRepository=new UserRepository(),
                 passwordService=new PasswordService(),
                  signupUser=new SignupUser() ,
                   otpService = new OtpService(),
                   otpverifying=new Otpverifying(),
                    resendotp=new Resendotp(),
                     loginuser=new LoginUser()  
                    
     ) {
                this.userRepository = userRepository;
                 this.passwordService = passwordService;
                  this.signupUser = signupUser
                   this.otpService =otpService
                   this.otpverifying=otpverifying
                   this.resendotp=resendotp
                   this.loginuser=loginuser
                 
       }

    signup = async (req, res,next) => {
        try {
            const { name, password,email } = req.body;
           
            const user = await this.signupUser.execute(name,password,email)
            await this.otpService.sendOtp(email)
            console.log(user);
            
        
            res.status(201).json({ success: true, user });
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }

  /*OTP VERIFICATION*//////////////


    verifyOtp=async(req,res,next)=>{
        try {
            console.log("vnnitilla");
            const {email,otp}=req.body
            console.log("yvide");
            console.log(req.body);
            const result=await this.otpverifying.excute(email,otp)
            console.log('result',result);
            
            console.log('About to send response to frontend');
            res.status(200).json({ message: 'user created', result });
            console.log('Response sent successfully');
        } catch (error) {
            console.log(error);
            next(error); 
        }
    }

/*resend OTP*///////////////////////
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


////////* user LOGIN   *///////////

 login= async(req,res,next)=>{
    try {
        const {email,password}=req.body
        const {Token,User} =await this.loginuser.excute(email,password)
        console.log(Token);
        res.clearCookie("driverToken", { path: "/driver" });
        res.cookie('token',Token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        })
        res.status(201).json({ success: true, User });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message })
        next(error)
    }
 }

 checkAuth=async(req,res)=>{
    try {
         console.log(" authhhhhhh:: ",req.user);
         
        console.log('Auth sucess')
        res.json({success:true,user:req.user})
    } catch (error) {
        
    }
 }

 logout=async(req,res)=>{
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'None' }); 
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Logout failed" });
    }
 }

 createOrder=async(req,res)=>{
    try {

        console.log("creteordeback");
        const { amount } = req.body;
   console.log(amount);
   
        if (!amount) {
          return res.status(400).json({ error: 'Amount is required' });
        }


         
    const order = await razorpay.orders.create({
      amount: amount*100,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).slice(2),
    });
console.log("order",order);

    res.json(order);

        
    } catch (error) {
        console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order' });
    }
 }


 verifypayment=async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({error:'failed in verifypayment  '})
    }
 }



}

export default UserController;
