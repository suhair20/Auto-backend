import OtpService from '../../infrastructure/services/OTP.js'
import DriverRepository from "../../repository/implementation/DriverRepository.js";

class Otpverifying{
    constructor(driverRepository=new DriverRepository(),otpService=new OtpService()){
       this.DriverRepository=driverRepository,
       this.otpService=otpService
    }

    async excute(email,otp){
        console.log('welcome');
        const isValidOtp= await this.otpService.verifyOtp(email,otp)
        console.log(isValidOtp,"heoo");
        
     if(!isValidOtp){
        throw new Error('Invalid OTP')
     }

  console.log("heloo");
     await this.DriverRepository.updateDriverVerificationStatus(email, true);

     this.otpService.deleteOtp(email)
    }
}
export default Otpverifying