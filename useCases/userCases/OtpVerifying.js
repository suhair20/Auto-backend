
import OtpService from '../../infrastructure/services/OTP.js'
import UserRepository from "../../repository/implementation/UserRepository.js";

class Otpverifying{
    constructor(userRepository=new UserRepository(),otpService=new OtpService()){
       this.userRepository=userRepository,
       this.otpService=otpService
    }

    async excute(email,otp){
        console.log('welcome');
        const isValidOtp= await this.otpService.verifyOtp(email,otp)
     if(!isValidOtp){
        throw new Error('Invalid OTP')
     }

  console.log("heloo");
    const updateuser= await this.userRepository.updateUserVerificationStatus(email, true);
  console.log('heloobba');
  
     this.otpService.deleteOtp(email)
     console.log('vannuu');
     return updateuser
     
    }
}
export default Otpverifying