import PasswordService from '../../infrastructure/services/PasswordServices.js'
import UserRepository from '../../repository/implementation/UserRepository.js'
import User from '../../entities/userEntities.js'

class SignupUser{
    constructor(userRepository=new UserRepository(), passwordService=new PasswordService()){
    this.userRepository=userRepository
    this.PasswordService=passwordService
    }

    async execute(name,password,email){  
        
        console.log(password);
        const existingUser=await this.userRepository.findByemail(email)
        if(existingUser){
            throw new Error('User already exists');
        }
    const hashPassword=await this.PasswordService.hashaPassword(password)
    
       const user = new User(name,email,hashPassword)
       console.log(user);
      await this.userRepository.save(user)
      return user
    }
}
export default SignupUser