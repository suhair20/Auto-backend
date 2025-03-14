import React from 'react'
import PasswordServices from "../../infrastructure/services/PasswordServices.js";
import Jwt from '../../infrastructure/services/Jwt.js'
import DriverRepository from '../../repository/implementation/DriverRepository.js';


class LoginDriver {
 constructor(driverRepository=new DriverRepository(),jwtToken=new Jwt(),passwordServices=new PasswordServices()){
    this.driverRepository=driverRepository
    this.passwordServices=passwordServices
    this.jwtToken=jwtToken
 }

async excute(email,password){
    try {
        console.log(email);
        
        const User=await this.driverRepository.findByemail(email)
        if(!User){
            throw new Error('User does not exist');
        }
        
      const isPasswordValid=await this.passwordServices.comparePassword(password,User.password)
      if (isPasswordValid){
        const driverToken=await this.jwtToken.genrateToken({id:User.id,email:User.email});
        return {driverToken,User}
      }else{
        throw new Error('Invalid password')
      }

    } catch (error) {
        console.log(error);
        throw error
    }
}



}

export default LoginDriver
