// userRoute.js
import express from 'express'
import UserController from '../../../inerfaceAdapters/controllers/userController.js'
import SignupUser from '../../../useCases/userCases/SignupUser.js'
import PasswordService from '../../services/PasswordServices.js'
import UserRepository from '../../../repository/implementation/UserRepository.js'
import Otpverifying from '../../../useCases/userCases/OtpVerifying.js'
import OtpService from '../../services/OTP.js'
import LoginUser from '../../../useCases/userCases/LoginUser.js'


const userRoute = express.Router();

const userRepository = new UserRepository();
const passwordService = new PasswordService();
const signupUser = new SignupUser(userRepository, passwordService);
const otpService =new OtpService()
const otpVerifying=new Otpverifying(userRepository,otpService)
const loginuser=new LoginUser(passwordService)
const userController = new UserController(signupUser);

userRoute.post('/register', userController.signup);
userRoute.post('/verify-otp',userController.verifyOtp)
userRoute.post('/resend-otp',userController.resendingOtp)
userRoute.post('/login',userController.login)

export default userRoute;
