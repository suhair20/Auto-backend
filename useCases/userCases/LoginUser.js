 
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
            const User=await this.userRepository.findByemail(email)
            if(!User){
                throw new Error('User does not exist');
            }
            console.log(User);
          const isPasswordValid=await this.passwordServices.comparePassword(password,User.password)
          if (isPasswordValid){
            const Token=await this.jwtToken.genrateToken({id:User.id,email:User.email});
            console.log(Token,User);
            
            return {Token,User}
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