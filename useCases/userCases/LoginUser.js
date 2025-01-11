 
import UserRepository from "../../repository/implementation/UserRepository.js";
import PasswordServices from "../../infrastructure/services/PasswordServices.js";
import Jwt from '../../infrastructure/services/Jwt.js'

 class LoginUser{
    constructor(userRepository=new UserRepository(),passwordServices=new PasswordServices(),jwtToken=new Jwt()){
      this.userRepository=userRepository
      this.passwordServices=passwordServices
      this.jwtToken=jwtToken
    }
    async excute(email,password){
        try {
            const existingUser=await this.userRepository.findByemail(email)
            if(!existingUser){
                throw new Error('User does not exist');
            }
            console.log(existingUser);
          const isPasswordValid=await this.passwordServices.comparePassword(password,existingUser.password)
          if (isPasswordValid){
            const Token=await this.jwtToken.genrateToken({id:existingUser.id,email:existingUser.email});
            return Token
          }else{
            throw new Error('Invalid password')
          }

        } catch (error) {
            console.log(error);
            throw error
        }
    }
 }

 export default LoginUser