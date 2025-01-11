


import Otpservice from '../../infrastructure/services/OTP.js'


class Resendotp{
    constructor(otpservice=new Otpservice()){
     this.otpservice=otpservice
    }
  async excute (email){
      await this.otpservice.sendOtp(email)
  }

}
export default Resendotp