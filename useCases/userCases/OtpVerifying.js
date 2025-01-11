
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
     await this.userRepository.updateUserVerificationStatus(email, true);

     this.otpService.deleteOtp(email)
    }
}
export default Otpverifying